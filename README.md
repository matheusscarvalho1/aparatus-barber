
# APARATUS — Hall de Barbearias com Agendamento e IA

**Link**: [aparatus-barber-eta.vercel.app/](https://aparatus-barber-eta.vercel.app/)

## 📋 Descrição

**Aparatus** é uma plataforma full-stack para gerenciamento de barbearias, desenvolvida com **Next.js 15** e focada em performance, acessibilidade e experiência **mobile-first**.  
O sistema permite o agendamento de serviços via calendário tradicional ou por meio de um **assistente de IA**, além de oferecer catálogo de serviços, pagamentos online com **Stripe** e um painel administrativo completo.

O projeto foi pensado como um estudo prático das principais tecnologias modernas do ecossistema **JavaScript / TypeScript**, aplicando boas práticas de arquitetura, UI/UX e integração com serviços externos.

O principal objetivo foi aprimorar minhas entregas como desenvolvedor, utilizando IA generativa aplicada ao desenvolvimento de software, através de prompts otimizados que definem persona, tarefas, objetivos e contexto do projeto (MCP, regras globais, etc.) nos agentes de IA como GitHub Copilot, Cursor ou Claude Code, sempre como ferramenta de aceleração, e não como substituição do processo de desenvolvimento, mantendo total controle sobre o código e avaliando cada decisão gerada.

### Avisos / Limitações

- Chat com IA: Atualmente, o assistente de IA utiliza o plano gratuito do Gemini. Em alguns momentos, pode ocorrer limite de requisições (quotes), o que pode gerar erros temporários ou indisponibilidade do chat.

- Essa limitação não afeta o restante da aplicação, que continua funcional, incluindo agendamento via calendário, pagamentos e navegação pelo site.


## 🚀 Tecnologias Principais

### Frontend

- **Next.js 15** — App Router e Server Components
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** — componentes baseados em Radix UI
- **Radix UI** — acessibilidade nativa
- **React Hook Form** — formulários performáticos
- **Zod** — validação de dados
- **React Day Picker** — seleção de datas
- **Lucide React** — ícones
- **Sonner** — notificações (toasts)

### Backend & Banco de Dados

- **Node.js**
- **Drizzle ORM** ou **Prisma** (adaptável conforme escolha)
- **PostgreSQL (Neon)**
- **Better Auth** — autenticação moderna
- **Stripe** — pagamentos e webhooks

### Estado & Infraestrutura

- **TanStack Query (React Query)**
- **Server Actions (Next.js)**
- **Vercel** — deploy
- **Docker** — opcional para ambiente local
- **GitHub Actions** — CI/CD

### Integrações de IA

- **@ai-sdk/openai**
- **@ai-sdk/google**
