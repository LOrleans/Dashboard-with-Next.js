# 📦 Dashboard de Estoque — Next.js + Prisma + PostgreSQL

Um dashboard de gerenciamento de estoque construído com **Next.js 16**, **Prisma ORM** e **PostgreSQL**. Tem cadastro e login de usuários e operações completas de CRUD (criar, ler, editar e excluir) em produtos, com dados persistidos em banco de dados relacional.

> **Status:** em desenvolvimento. O fluxo de autenticação e o CRUD de estoque estão funcionando. As páginas **Home**, **Financeiro** e **Localização** ainda são placeholders, e a estilização mobile está em andamento.

## ✨ Funcionalidades

- 🔐 **Cadastro e login** de usuários, com senhas protegidas por hash (bcrypt) e sessão via JWT (NextAuth)
- 🛡️ **Rota `/estoque` protegida**: usuários não autenticados são redirecionados para `/login`
- 📋 **Listagem de produtos** com nome, quantidade (com unidade de medida) e data de validade
- 🗂️ **Filtro por categoria** (Supermercado, Farmácia, Limpeza, Higiene e Outros)
- ➕ **Cadastro de produtos** via modal, com categoria, subcategoria, unidade de medida e validade
- ✏️ **Edição de produtos** existentes
- 🗑️ **Exclusão de produtos** com confirmação
- ⚡ **Server Actions** do Next.js para comunicação direta com o banco

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Função |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.x | Framework React fullstack |
| [React](https://react.dev/) | 19.x | Biblioteca de UI |
| [Prisma ORM](https://www.prisma.io/) | 6.x | Acesso ao banco de dados e migrations |
| [PostgreSQL](https://www.postgresql.org/) | 14+ | Banco de dados relacional |
| [NextAuth.js](https://next-auth.js.org/) | 4.x | Autenticação (credenciais + JWT) |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 3.x | Hash de senhas |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Estilização |

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) **v18 ou superior**
- [npm](https://www.npmjs.com/) (já incluso no Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) **v14 ou superior** rodando localmente (ou uma instância remota / serviço de nuvem)

---

### 1. Clone o repositório

```bash
git clone https://github.com/LOrleans/Dashboard-with-Next.js.git
cd Dashboard-with-Next.js
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo (o `.env` real nunca deve ser versionado):

```bash
# No Linux/macOS
cp .env.example .env

# No Windows (PowerShell)
Copy-Item .env.example .env
```

Abra o `.env` e preencha:

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | String de conexão do PostgreSQL | `postgresql://USUARIO:SENHA@localhost:5432/estoque_db?schema=public` |
| `NEXTAUTH_SECRET` | Chave usada para assinar a sessão (JWT). Gere uma aleatória | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL pública da aplicação. Necessária em produção | `http://localhost:3000` |

Para gerar o `NEXTAUTH_SECRET` sem o `openssl` (por exemplo no Windows):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. Crie o banco de dados no PostgreSQL

```bash
# Conecta ao PostgreSQL como superusuário
psql -U postgres

# Dentro do psql, crie o banco:
CREATE DATABASE estoque_db;
\q
```

### 5. Execute as migrations do Prisma

```bash
npx prisma migrate deploy
```

Isso cria as tabelas `Product` e `User` no seu banco.

> **Alternativa (em desenvolvimento):** use `npx prisma migrate dev` para criar e aplicar novas migrations interativamente.

### 6. Gere o Prisma Client

```bash
npx prisma generate
```

> ⚠️ Este passo é necessário caso o `npm install` não tenha gerado o client automaticamente. Sem ele, a aplicação não consegue se comunicar com o banco.

### 7. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Crie uma conta em `/cadastro`, faça login em `/login` e abra a página de estoque em `/estoque`.

---

## 📁 Estrutura do Projeto

```
.
├── prisma/
│   ├── schema.prisma               # Modelos do banco de dados
│   └── migrations/                 # Histórico de migrations SQL
├── src/
│   ├── actions/
│   │   ├── auth.ts                 # Server Actions — cadastro e login
│   │   └── products.ts             # Server Actions — CRUD de produtos
│   ├── app/
│   │   ├── (auth)/                 # Páginas /login e /cadastro
│   │   ├── (dashboard)/            # Páginas /home, /estoque, /financeiro e /localizacao
│   │   ├── api/auth/[...nextauth]/ # Rota do NextAuth
│   │   ├── components/             # Sidebar, barras mobile e modais de produto
│   │   ├── layout.tsx              # Layout principal
│   │   └── globals.css             # Estilos globais
│   ├── lib/
│   │   └── prisma.ts               # Singleton do Prisma Client
│   ├── providers/
│   │   └── NextAuthProvider.tsx    # Provider de sessão
│   ├── types/
│   │   └── Product.ts              # Tipos dos produtos
│   └── proxy.ts                    # Protege a rota /estoque
├── .env.example                    # Modelo das variáveis de ambiente
├── package.json
└── tsconfig.json
```

---

## 🗄️ Schema do Banco de Dados

### Tabela `Product`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `Int` (autoincrement) | Identificador único |
| `name` | `String` | Nome do produto |
| `quantity` | `Int` | Quantidade em estoque |
| `category` | `String` | Categoria do produto |
| `unitMeasure` | `String?` | Unidade de medida (kg, caixa, pacote ou unidade) |
| `validationDate` | `DateTime?` | Data de validade (mês e ano) |
| `createdAt` | `DateTime` | Data de criação |
| `updatedAt` | `DateTime` | Data da última atualização |

### Tabela `User`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `Int` (autoincrement) | Identificador único |
| `name` | `String` | Nome do usuário |
| `email` | `String` (único) | E-mail usado no login |
| `password` | `String` | Hash bcrypt da senha |
| `createdAt` | `DateTime` | Data de criação |
| `updatedAt` | `DateTime` | Data da última atualização |

---

## 🔧 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor em modo produção |
| `npm run lint` | Verifica erros de lint no código |
| `npx prisma studio` | Abre interface visual do banco de dados |
| `npx prisma migrate dev` | Cria e aplica uma nova migration |
| `npx prisma migrate deploy` | Aplica migrations pendentes (produção) |

---

## 🐛 Solução de Problemas

**Erro: `Can't reach database server`**
- Verifique se o PostgreSQL está rodando: `pg_ctl status` ou o serviço no seu sistema.
- Confirme se as credenciais na `DATABASE_URL` estão corretas.

**Erro: `PrismaClientInitializationError`**
- Execute `npx prisma generate` para regenerar o client.

**Erro: `relation "Product" does not exist`**
- Execute `npx prisma migrate deploy` para aplicar as migrations pendentes.

**Login não funciona ou a sessão cai**
- Confirme que o `NEXTAUTH_SECRET` está definido no `.env` e reinicie o servidor.

**Porta 3000 já em uso**
- Use uma porta diferente: `npm run dev -- -p 3001`

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
