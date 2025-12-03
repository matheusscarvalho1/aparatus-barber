import { streamText, convertToModelMessages, tool, stepCountIs } from "ai"
import { google } from '@ai-sdk/google'
import z from "zod";
import { prisma } from "@/lib/prisma";
import { getDateAvailableTimeSlots } from "@/app/_actions/get-date-available-time-slots";
import { createBooking } from "@/app/_actions/create-booking";
import { getSessionAction } from "@/app/_actions/get-session";
import { getDateTimeZone } from "@/app/_actions/get-date-time-zone";

export const POST = async (request: Request) => {
  const { messages } = await request.json();

  const result = streamText({
    model: google('gemini-2.0-flash'),
    stopWhen: stepCountIs(10),
    system: `Você é o Aparatus, um assistente virtual de agendamento de barbearias.

    DATA ATUAL: Hoje é ${new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })} (${new Date().toISOString().split("T")[0]})

    Seu objetivo é ajudar os usuários a:
    - Encontrar barbearias (por nome ou todas disponíveis)
    - Verificar disponibilidade de horários para barbearias específicas
    - Fornecer informações sobre serviços e preços

    Fluxo de atendimento:

    CENÁRIO 1 - Usuário menciona data/horário na primeira mensagem (ex: "quero um corte pra hoje", "preciso cortar o cabelo amanhã", "quero marcar para sexta"):
    1. Use a ferramenta searchBarbershops para buscar barbearias
    2. IMEDIATAMENTE após receber as barbearias, use a ferramenta getAvailableTimeSlotsForBarbershop para CADA barbearia retornada, passando a data mencionada pelo usuário
    3. Apresente APENAS as barbearias que têm horários disponíveis, mostrando:
       - Nome da barbearia
       - Endereço
       - Serviços oferecidos com preços
       - Alguns horários disponíveis (7-8 opções espaçadas)
    4. Quando o usuário escolher, forneça o resumo final.

    CENÁRIO 2 - Usuário não menciona data/horário inicialmente:
    1. Use a ferramenta searchBarbershops para buscar barbearias
    2. Apresente as barbearias encontradas com:
       - Nome da barbearia
       - Endereço
       - Serviços oferecidos com preços
    3. Quando o usuário demonstrar interesse em uma barbearia específica ou mencionar uma data, pergunte a data desejada (se ainda não foi informada)
    4. Use a ferramenta getAvailableTimeSlotsForBarbershop passando o barbershopId e a data
    5. Apresente os horários disponíveis (liste alguns horários, não todos - sugira 7-8 opções espaçadas)

    Resumo final (quando o usuário escolher):
    - Nome da barbearia
    - Endereço
    - Serviço escolhido
    - Data e horário escolhido
    - Preço

    Importante:
    - Quando o usuário começar a conversa, **SEMPRE** verifique você mesmo se ele esta autenticado na plataforma utilizando a tool 'getSession', caso ele não esteja autenticado, indique para ele o menu hamburguer em cima para autenticar ao lado do icone do chat (o último botão a direita, lá é possivel fazer autenticação), se ele já estiver logado, comprimente ele e deseje bom dia, boa tarde, boa noite, conforme o horário em que ele iniciou o chat.
      - Se não estiver autenticado, informe que ele precisa acessar o menu hambúrguer no canto superior direito, ao lado do ícone do chat, para fazer login.
      - Não prossiga até existir uma sessão válida.
      - Se estiver autenticado, cumprimente o usuário com bom dia, boa tarde ou boa noite, conforme o horário atual.
      - Sempre que o usuário iniciar a conversa ou enviar uma saudação e falar o nome dele (Ex: Boa noite Matheus), chame a ferramenta 'getDateTimeZone' para identificar o horário atual e a ferramenta 'getSession' para saber o nome da pessoa. Use essa informação para responder com bom dia / boa tarde / boa noite.
    - Se o usuário insistir dizendo que está autenticado, execute getSession novamente.
      - Se ainda não houver sessão válida, diga que não é possível continuar, pois a plataforma só pode registrar agendamentos com autenticação ativa.
    - NUNCA mostre informações técnicas ao usuário (barbershopId, serviceId, formatos ISO de data, etc.)
    - SEMPRE retorne texto para o usuário, NUNCA JSON.
    - Seja sempre educado, prestativo e use uma linguagem informal e amigável
    - Não liste TODOS os horários disponíveis, sugira apenas 4-5 opções espaçadas ao longo do dia
    - Se não houver horários disponíveis, sugira uma data alternativa
    - Quando o usuário mencionar "hoje", "amanhã", "depois de amanhã" ou dias da semana, calcule a data correta automaticamente.
    - NUNCA inicie pagamentos com Stripe. 
    - O chat só pode criar agendamentos simples e SEM pagamento antecipado. 
    - Todo agendamento criado via chat deve ser pago exclusivamente no local. 
    - Somente a interface principal do sistema pode iniciar pagamentos pelo Stripe — o chat está proibido de realizar qualquer cobrança.
    
  IMPORTANTE - SOBRE HORÁRIO:
  - O usuário sempre fala horários no fuso da barbearia (America/Cuiabá ou UTC-3).
  - NUNCA converta horários para UTC.
  - Envie para a ferramenta creatingBooking o mesmo horário que o usuário pediu.
  - Toda conversão de fuso é feita automaticamente no backend.
  - Nunca some ou subtraia horas manualmente.
    `,
    
    messages: convertToModelMessages(messages),
    tools: {
      searchBarbershops: tool({
        description: `Pesquisas barbearias pelo nome. Se nenhum nome é fornecido, retorna todas as barbearias.
        
        1. Use a ferramenta(tool) searchBarbershops para buscar barbearias.
        2. Apresente as barbearias encontradas EM TEXTO CLARO, FORMATADO e FÁCIL DE LER com:
        - Nome da barbearia
        - Endereço
        `,
        inputSchema: z.object({
          name: z.string().optional().describe("Nome opcional da barbearia"),
        }),
        execute: async ({ name }) => {
          if (!name?.trim()) {
            const barbershops = await prisma.barbershop.findMany({
              include: {
                services: true,
              },
            });
            return barbershops.map((barbershop) => ({
              barbershopId: barbershop.id,
              name: barbershop.name,
              addcress: barbershop.address,
              services: barbershop.services.map((service) => ({
                id: service.id,
                name: service.name,
                price: service.priceInCents / 100,
              })),
            }));
          }

          const barbershops = await prisma.barbershop.findMany({
            where: {
              name: {
                contains: name,
                mode: "insensitive",
              },
            },
          });
          return barbershops;
        },
      }),
      getAvailableTimeSlotsForBarbershop: tool({
        description: "Obtém os horários disponíveis para uma barbearia em uma data específica.",
        inputSchema: z.object({
          barbershopId: z.uuid().describe("ID da barbearia"),
          date: z.string().describe("Data para a qual deseja obter os horários disponíveis"),
        }),
        execute: async ({ barbershopId, date }) => {
          const parsedDate = new Date(date)
          const result = await getDateAvailableTimeSlots({
              barbershopId,
              date: parsedDate,
            });
            if(result.serverError || result.validationErrors){
              return {
                error: result.validationErrors?._errors?.[0],
              }
            }
            return {
              barbershopId,
              date,
              availableTimeSlots: result.data,
            }
        }
      }),
      creatingBooking: tool({
        description: "Criar um agendamento para um serviço em uma data específica.",
        inputSchema: z.object({
          serviceId: z.string().describe("ID do serviço"),
          date: z.string().describe("Data em ISO String para a qual deseja agendar"),
        }),
        execute: async ({ serviceId, date}) => {
          const parsedDate = new Date(date);
          const result = await createBooking({
            serviceId,
            date: parsedDate,
          })
          if(result.validationErrors?._errors?.[0] || result.validationErrors) {
            return {
              error: result.validationErrors?._errors?.[0] || "Erro ao criar Agendamento",
            }
          }
          return {
            success: true,
            message: "Agendamento criado com sucesso.",
          }
        }
      }),
      getSession: tool({
  description: "Verifica se o usuário está autenticado na aplicação.",
  inputSchema: z.object({
    sessionId: z.string().optional().describe("ID da sessão, se existir"),
  }),
  execute: async () => {
    const session = await getSessionAction();

    if (!session) {
      return {
        isAuthenticated: false,
      };
    }

    return {
      isAuthenticated: true,
      userId: session.user.id,
      email: session.user.email,
    };
  },
      }),
      getDateTimeZone: tool({
  description: "Retorna o horário local do usuário para personalizar respostas.",
  inputSchema: z.object({}),
  execute: async () => {
    return await getDateTimeZone();
  },
}),
    }
  });
  return result.toUIMessageStreamResponse();
};