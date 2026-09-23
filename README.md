# 📦 Dashboard de Estoque — Next.js + Prisma + PostgreSQL

Um dashboard moderno de gerenciamento de estoque construído com **Next.js 16**, **Prisma ORM** e **PostgreSQL**. Permite realizar operações completas de CRUD (criar, ler, editar e excluir) em produtos, com dados persistidos em banco de dados relacional.

## ✨ Funcionalidades

- 📋 **Listagem de produtos** com nome, quantidade e preço
- ➕ **Cadastro de novos produtos** via modal
- ✏️ **Edição de produtos** existentes
- 🗑️ **Exclusão de produtos** com confirmação
- ⚡ **Server Actions** do Next.js para comunicação direta com o banco
- 🔄 **Revalidação automática** de cache após cada operação

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Função |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.x | Framework React fullstack |
| [React](https://react.dev/) | 19.x | Biblioteca de UI |
| [Prisma ORM](https://www.prisma.io/) | 6.x | Acesso ao banco de dados |
| [PostgreSQL](https://www.postgresql.org/) | 14+ | Banco de dados relacional |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Estilização |

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) **v18 ou superior**
- [npm](https://www.npmjs.com/) (já incluso no Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) **v14 ou superior** rodando localmente (ou uma instância remota / serviço de nuvem)

---

### 1. Clone o repositório

```bash
git clone https://github.com/LOrleans/Dashboard-with-Next.js.git
cd Dashboard-with-Next.js
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# No Linux/macOS
cp .env.example .env

# No Windows (PowerShell)
Copy-Item .env.example .env
```

> **Nota:** Se não houver um `.env.example`, crie o arquivo `.env` manualmente.

Abra o `.env` e preencha com as suas credenciais do PostgreSQL:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
```

**Substitua os valores:**

| Placeholder | Descrição | Exemplo |
|---|---|---|
| `USUARIO` | Usuário do PostgreSQL | `postgres` |
| `SENHA` | Senha do usuário | `minhasenha123` |
| `localhost` | Host do banco | `localhost` ou IP remoto |
| `5432` | Porta padrão do PostgreSQL | `5432` |
| `NOME_DO_BANCO` | Nome do banco de dados | `estoque_db` |

**Exemplo completo:**

```env
DATABASE_URL="postgresql://postgres:minhasenha123@localhost:5432/estoque_db?schema=public"
```

---

### 4. Crie o banco de dados no PostgreSQL

Se ainda não criou o banco de dados, conecte-se ao PostgreSQL e execute:

```sql
CREATE DATABASE estoque_db;
```

Você pode fazer isso via terminal:

```bash
# Conecta ao PostgreSQL como superusuário
psql -U postgres

# Dentro do psql, crie o banco:
CREATE DATABASE estoque_db;
\q
```

---

### 5. Execute as migrations do Prisma

Aplique o schema do banco de dados com o comando:

```bash
npx prisma migrate deploy
```

Isso criará automaticamente a tabela `Product` no seu banco com a estrutura correta.

> **Alternativa (em desenvolvimento):** Use `npx prisma migrate dev` para criar e aplicar novas migrations interativamente.

---

### 6. Gere o Prisma Client

```bash
npx prisma generate
```

> ⚠️ **Importante:** Este passo é necessário caso o `npm install` não tenha gerado automaticamente o client. Sem ele, a aplicação não consegue se comunicar com o banco.

---

### 7. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

A página de estoque está disponível em: [http://localhost:3000/estoque](http://localhost:3000/estoque)

---

## 📁 Estrutura do Projeto

```
next-app/
├── prisma/
│   ├── schema.prisma          # Definição dos modelos do banco de dados
│   └── migrations/            # Histórico de migrations SQL
├── src/
│   ├── actions/
│   │   └── products.ts        # Server Actions — CRUD de produtos
│   ├── app/
│   │   ├── estoque/
│   │   │   ├── page.tsx       # Página de estoque (Server Component)
│   │   │   └── EstoqueClient.tsx # Componente interativo do estoque
│   │   ├── layout.tsx         # Layout principal da aplicação
│   │   └── globals.css        # Estilos globais
│   ├── lib/
│   │   ├── prisma.ts          # Singleton do Prisma Client
│   │   └── estoque.ts         # Funções auxiliares de estoque
│   └── types/
│       └── Product.ts         # Tipos TypeScript dos produtos
├── .env                       # Variáveis de ambiente (não comitar!)
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
| `price` | `Float` | Preço unitário |
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
- Verifique se o PostgreSQL está rodando: `pg_ctl status` ou verifique o serviço no seu sistema.
- Confirme se as credenciais na `DATABASE_URL` estão corretas.

**Erro: `PrismaClientInitializationError`**
- Execute `npx prisma generate` para regenerar o client.

**Erro: `relation "Product" does not exist`**
- Execute `npx prisma migrate deploy` para aplicar as migrations pendentes.

**Porta 3000 já em uso**
- Use uma porta diferente: `npm run dev -- -p 3001`

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
