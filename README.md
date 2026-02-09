![Logo of the project](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/home-desktop.png)

# APARATUS — Hall de Barbearias com Agendamento e IA

**Link**: [aparatus-barber-eta.vercel.app/](https://aparatus-barber-eta.vercel.app/)

---

## 📌 Navegação Rápida

- [🖼️ Demonstração](#demonstracao)
- [📋 Descrição](#-descrição)
- [🤖 Engenharia de IA & Workflow](#-engenharia-de-ia--workflow)
- [⚠️ Avisos / Limitações](#️-avisos--limitações)
- [🚀 Tecnologias Principais](#-tecnologias-principais)
- [🛠️ Método de Desenvolvimento](#️-método-de-desenvolvimento)
- [🏗️ Arquitetura do Projeto](#️-arquitetura-do-projeto)
- [🔐 Segurança & Pagamentos](#-segurança--pagamentos)
- [📊 Performance, Responsividade & Acessibilidade](#-performance-responsividade--acessibilidade)
- [💈 Funcionalidades do Sistema](#-funcionalidades-do-sistema)
- [💳 Integração com Stripe](#-integração-com-stripe)
- [📊 Banco de Dados](#-banco-de-dados)
- [⚙️ Variáveis de Ambiente](#️-variáveis-de-ambiente)
- [📥 Scripts Disponíveis](#-scripts-disponíveis)
- [🧭 Como Rodar Localmente](#-como-rodar-localmente)
- [🔗 Links](#links)

---

<h1 id="descrição">📋 Descrição</h1> 

**Aparatus** é uma plataforma full-stack para gerenciamento de barbearias, desenvolvida com **Next.js 15** e focada em performance, acessibilidade e experiência **mobile-first**.  

O sistema permite o agendamento de serviços via calendário tradicional ou por meio de um **assistente de IA**, além de oferecer catálogo de serviços, pagamentos online com **Stripe**.

O projeto foi pensado como um estudo prático das principais tecnologias modernas do ecossistema **JavaScript / TypeScript**, aplicando boas práticas de arquitetura, UI/UX e integração com serviços externos.

O projeto foi pensado como um estudo prático das principais tecnologias modernas do ecossistema JavaScript / TypeScript, aplicando boas práticas de arquitetura, UI/UX e integração com serviços externos.

O principal objetivo foi aprimorar minhas entregas como desenvolvedor, utilizando IA generativa aplicada ao desenvolvimento de software, através de prompts otimizados que definem persona, tarefas, objetivos e contexto do projeto (MCP, regras globais, etc.) nos agentes de IA como GitHub Copilot, Cursor ou Claude Code, sempre como ferramenta de aceleração.

<h3 id="engenharia-de-ia--workflow">🤖 Engenharia de IA & Workflow</h3>

O desenvolvimento utilizou uma pipeline de AI Orchestration para garantir máxima produtividade e fidelidade técnica:
- Model Context Protocol (MCP):
   -  Context7: Integração de documentações sempre atualizadas para evitar alucinações da LLM.
   - Figma MCP: Codificação da interface com exatidão matemática em relação ao design original via extração de contexto.
- Governança com Cursor Rules (.mdc): Uso de regras customizadas para forçar padrões de Clean Code, SOLID, proibição de cores hard-coded e padronização de Server Actions.
- Prompt Engineering: Prompts estruturados com Persona, Contexto e Tarefas, utilizando slugs para SEO e evitando duplicidade de código via DRY.

<h3 id="avisos--limitações">⚠️ Avisos / Limitações</h3>

- Chat com IA: Atualmente, o assistente utiliza o plano gratuito do Gemini. Em alguns momentos, pode ocorrer limite de requisições (quotes), o que não afeta o restante da aplicação (calendário, pagamentos e navegação continuam funcionais).

<h2 id="tecnologias-principais">🚀 Tecnologias Principais</h2>

### Frontend

- **Next.js 16** — App Router, Server Components & Client Components
- **React 19**
- **Tailwind CSS 4**
- **shadcn/ui** — Implementado com Composition Pattern para modularidade
- **TanStack Query (React Query)** — Cache inteligente e fetching otimizado
- **Zod & React Hook Form** — Validação rigorosa de dados

### Backend & Banco de Dados

- **Node.js**
- **Prisma ORM**
- **PostgreSQL (Neon)**
- **Better Auth** — Autenticação moderna e segura
- **Next-Safe-Action** — Server Actions tipadas com validação de autorização
- **Stripe** — Pagamentos e fluxo resiliente de Webhooks

### Integrações de IA

- Vercel AI SDK (@ai-sdk/google, @ai-sdk/openai)
- Function Calling (Tools): IA capaz de consultar e executar ações no banco de dados através de Tools (Server Actions).

---

<h2 id="método-de-desenvolvimento">🛠️ Método de Desenvolvimento</h2>

- **Mobile First**
- Interface desenhada priorizando dispositivos móveis
- Componentes totalmente responsivos
- Uso extensivo de Server Components
- Separação clara entre camadas de UI, ações de servidor e acesso a dados

---

<h2 id="arquitetura-do-projeto">🏗️ Arquitetura do Projeto</h2>

### Estrutura de Pastas

```

src/
├── app/                    # App Router do Next.js
│   ├── api/               # Webhooks (Stripe, etc.)
│   ├── authentication/    # Autenticação
│   ├── barberhalls/       # Páginas públicas das barbearias
│   ├── bookings/          # Fluxo de agendamentos
│   ├── dashboard/         # Painel administrativo
│   └── ...
├── actions/               # Server Actions (createBooking, payments, etc.)
├── components/            # Componentes reutilizáveis
│   ├── common/           # Header, Footer, Cards
│   └── ui/               # Componentes shadcn/ui
├── data/                  # Acesso a dados (Server Components)
├── db/                    # Configuração do banco e migrations
├── hooks/                 # Hooks customizados
├── lib/                   # Utils, validações, helpers do Stripe
└── providers/             # Providers globais (Auth, Theme)

````

---

<h2 id="segurança--pagamentos">🔐 Segurança & Pagamentos</h2>

- **Better Auth**: Sessões seguras via cookies HTTP-only e middleware de autorização.
- **Stripe Webhooks**: Fluxo resiliente onde o agendamento só é confirmado após a notificação do gateway, incluindo lógica de reembolso automático em cancelamentos.
- **Sanitização**: Proteção total contra inputs maliciosos usando Zod e Server Actions protegidas.

<h3 id="performance-responsividade--acessibilidade">📊 Performance, Responsividade & Acessibilidade</h3>

- **Latência Zero**: Implementação de cache via TanStack Query seguindo estudos de conversão de tempo de resposta.
- * Server Components
- * Fetch paralelo de dados
- * Cache com TanStack Query
- * Lazy loading de componentes
- * SEO otimizado com metadados dinâmicos* Design **mobile-first**
- * Componentes acessíveis com Radix UI
- * Navegação por teclado
- * ARIA attributes quando necessário

---

<h2 id="funcionalidades-do-sistema">💈 Funcionalidades do Sistema</h2>

### Para Usuários

- Listagem de barbearias
- Visualização de serviços
- Busca e filtros por data e serviço
- Agendamento por calendário
- Agendamento via chat com IA
- Pagamento online com Stripe
- Histórico de agendamentos
- Perfil do usuário

---

<h2 id="integração-com-stripe">💳 Integração com Stripe</h2>

### Fluxo de Pagamento

1. Usuário inicia o checkout
2. Servidor cria a sessão no Stripe
3. Stripe processa o pagamento
4. Webhook confirma a transação
5. Booking é marcado como **confirmado** ou **cancelado**
6. Reembolso do pagamento com do Stripe com o Cliente caso ele cancele o agendamento

### Segurança

- Verificação de assinatura do webhook
- Chaves protegidas por variáveis de ambiente
- Processamento de pagamentos no servidor
---

<h2 id="banco-de-dados">📊 Banco de Dados</h2>

### Principais Entidades

- **Account** (Better Auth)
- **barbershop**
- **barbershopService**
- **Booking**
- **Session** (Better Auth)
- **User** (Better Auth)
- **Verification** (Better Auth)

### Relacionamentos

- barbershop → services (1:N)
- users → bookings (1:N)
- bookings → payments (1:1)

---

<h2 id="variáveis-de-ambiente">⚙️ Variáveis de Ambiente</h2>

```env
STRIPE_WEBHOOK_SECRET=...
BETTER_AUTH_URL=...
NEXT_PUBLIC_APP_URL=...
DATABASE_URL=...
BETTER_AUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
GOOGLE_GENERATIVE_AI_API_KEY=...
OPENAI_API_KEY=...
````

---

<h2 id="scripts-disponíveis">📥 Scripts Disponíveis</h2>

* `npm run dev` — Desenvolvimento local
* `npm run build` — Build de produção
* `npm run start` — Servidor de produção
* `npm run lint` — ESLint
* `npm run format` — Prettier
* `npm run migrate` — Migrations (Drizzle ou Prisma)
* `npm run seed` — Seed do banco

### Exemplo (Drizzle)

```bash
npm install
npx drizzle-kit migrate:up
node ./prisma/seed.js
```

---

<h2 id="como-rodar-localmente">🧭 Como Rodar Localmente</h2>

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/aparatus.git
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Configure o `.env`
4. Rode as migrations e seed:

   ```bash
   npm run migrate
   npm run seed
   ```
5. Inicie o projeto:

   ```bash
   npm run dev
   ```
6. Acesse:

   ```
   http://localhost:3000
   ```

---

<h2 id="demonstracao">📸 Demonstração do Projeto</h2>

### Home 
<p>Página inicial com visão geral das barbearias e serviços das barbearias disponíveis, note que a aplicação é responsiva, essa imagem abaixo é o mesmo menu mostrado no início da documentação desse projeto.</p>


![Logo of the project](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/home-mobile.png)
<hr>

### Pesquisa por serviços para disponibilizar barbearias disponíveis com esse serviço para o usuário
<p>Ao clicar em algumas das dicas de pesquisa logo abaixo do campo de pesquisa, ou escrevendo algo no campo de pesquisa, a aplicação busca o serviço desejado.</p>

![Services](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/searching-for-service.png)
<hr>

### Menu de Login
<p>Ao clicar no menu a direita é exibido as informações da conta que fez login ou aparece o botão para realizar o login para conseguir fazer um agendamento, só é possível fazer um agendamento com uma conta logada.</p>

![Menu](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/menu-logged.png)
<hr>

### Serviços das barbearias
<p>Ao escolher uma barbearia na Homepage, você é redirecionado para uma pagina que lista os serviços oferecidos por aquela barbearia.</p>

![Barber services](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/barber-services.png)
<hr>

### Confirmando agendamento
<p>Ao selecionar o serviço irá abrir o menu de reserva para selecionar o dia e a hora que deseja realizar o serviço.</p>

![Confirming an appointment](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/making-an-appointment.png)

### Checkout do serviço pelo stripe (Integração)
<p>Tela de checkout do Stripe exibida após a confirmação do agendamento, com os dados do serviço e pagamento direcionado para a conta configurada via webhook integrado à API. (DADOS UTILIZADOS NA IMAGEM SÃO FICTICIOS USADO EXCLUISVAMENTE PARA TESTES)</p>

![Checkout service](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/checkout-service-payment-stripe.png)

### Pagamento confirmado (Integração)

![Checkout service](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/appointment-comfirmed-and-paid.png)

### Histórico de agendamentos
<p>Ao finalizar o pagamento corretamente, você será redirecionado para a página de históricos de agendamentos, listando todos os serviços que foi agendado na sua conta, os serviços confirmados e cancelados.</p>

![Appointments history](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/appointments-history.png)

### Agendamento por pelo chat de IA
<p>**Lembrando que essa feature é bem instavel pois eu utilizo o plano gratis da API do GEMINI então os tokens são muito limitados, porém irei disponibilizar um vídeo mostrando o funcionamento do chat de IA.**</p>

![IA Chat for appointments](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/path-to-ai-appointment.png)

![IA Chat for appointments](https://github.com/matheusscarvalho1/aparatus-barber/blob/main/public/docs/screenshots/ai-appointment.png)

<p>A Implementação permite por meio de Tools configurados na API acessar a base  de dados para obter o nome do usuário que esta logado e conversando com a IA, pesquisar pelo nome das barbearias e caso não for informado o nome retornar todas as barbearias, para obter os horários disponíveis da barbearia escolhida, criar o agendamento, verificar se o usuário esta logado na aplicação, retornar o horário dependendo do usuário que esta conversando com ela.</p>


<h2 id="links">🔗 Links</h2>

- 🌐 Portfólio: https://matheusscarvalho-dev.onrender.com/
  
- 💻 Repositório: https://github.com/matheusscarvalho1/portfolio/
  
- 💼 LinkedIn: https://www.linkedin.com/in/matheusscarvalho/

## 👤 Autor

**Matheus de Souza Carvalho**  
Full Stack Developer | Software Engineer  

⭐ Se este projeto foi útil, considere deixar uma estrela no repositório!
