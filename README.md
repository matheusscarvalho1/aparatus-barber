
# APARATUS — Hall de Barbearias com Agendamento e IA

**Link**: [aparatus-barber-eta.vercel.app/](https://aparatus-barber-eta.vercel.app/)

## 📋 Descrição

**Aparatus** é uma plataforma full-stack para gerenciamento de barbearias, desenvolvida com **Next.js 15** e focada em performance, acessibilidade e experiência **mobile-first**.  
O sistema permite o agendamento de serviços via calendário tradicional ou por meio de um **assistente de IA**, além de oferecer catálogo de serviços, pagamentos online com **Stripe** e um painel administrativo completo.

O projeto foi pensado como um estudo prático das principais tecnologias modernas do ecossistema **JavaScript / TypeScript**, aplicando boas práticas de arquitetura, UI/UX e integração com serviços externos.

O principal objetivo foi aprimorar minhas entregas como desenvolvedor, utilizando IA de forma estratégica, através de prompts otimizados que definem persona, tarefas, objetivos e contexto do projeto (MCP, regras globais, etc.) nos agentes de IA como GitHub Copilot, Cursor ou Claude Code, sempre como ferramenta de aceleração, e não como substituição do processo de desenvolvimento, mantendo total controle sobre o código e avaliando cada decisão gerada.

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
- **@ai-sdk/react**

Assistente inteligente para auxiliar o usuário no processo de agendamento via chat.

---

## 🛠️ Método de Desenvolvimento

- **Mobile First**
- Interface desenhada priorizando dispositivos móveis
- Componentes totalmente responsivos
- Uso extensivo de Server Components
- Separação clara entre camadas de UI, ações de servidor e acesso a dados

---

## 🏗️ Arquitetura do Projeto

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

## 🔐 Sistema de Autenticação

### Better Auth

- Login com email e senha
- OAuth com Google
- Sessões seguras via cookies HTTP-only
- Middleware de autorização em rotas server

### Segurança

- Validação de dados com Zod
- Sanitização de inputs
- Proteção de rotas administrativas
- Verificação de assinatura de webhooks Stripe

---

## 💈 Funcionalidades do Sistema

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

## 💳 Integração com Stripe

### Fluxo de Pagamento

1. Usuário inicia o checkout
2. Servidor cria a sessão no Stripe
3. Stripe processa o pagamento
4. Webhook confirma a transação
5. Booking é marcado como **paid**

### Segurança

- Verificação de assinatura do webhook
- Chaves protegidas por variáveis de ambiente
- Processamento de pagamentos no servidor

---

## 📊 Banco de Dados

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

## ⚙️ Variáveis de Ambiente

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

## 📥 Scripts Disponíveis

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

## 🧭 Como Rodar Localmente

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

## 📱 Responsividade & Acessibilidade

* Design **mobile-first**
* Componentes acessíveis com Radix UI
* Navegação por teclado
* ARIA attributes quando necessário

---

## 📈 Performance

* Server Components
* Fetch paralelo de dados
* Cache com TanStack Query
* Lazy loading de componentes
* SEO otimizado com metadados dinâmicos

---

## 👨‍💻 Desenvolvido por

**Matheus Carvalho**

* LinkedIn: [@matheusscarvalho](https://www.linkedin.com/in/matheusscarvalho/)
* GitHub: [@matheusscarvalho1](https://github.com/matheusscarvalho1)


