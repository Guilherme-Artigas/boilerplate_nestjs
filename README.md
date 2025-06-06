# 📦 CRUD de Empresas e Produtos

## DESENVOLVIDO POR: Carlos Eduardo Moura Lemes

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)

---

## Funcionalidades

### Empresas

| Método | Rota                        | Descrição                                  |
|--------|-----------------------------|--------------------------------------------|
| GET    | `/companies`               | Lista todas as empresas com paginação (`?page=1&limit=10`) |
| GET    | `/companies/:id`           | Retorna uma empresa pelo ID                |
| GET    | `/companies/search?name=`  | Busca parcial por nome                     |
| POST   | `/companies/create`        | Cria uma nova empresa                      |
| PUT    | `/companies/:id`           | Atualiza dados da empresa                  |
| DELETE | `/companies/:id`           | Remove a empresa e seus produtos (cascade) |

---

### Produtos

| Método | Rota                        | Descrição                                  |
|--------|-----------------------------|--------------------------------------------|
| GET    | `/products`                | Lista todos os produtos com paginação (`?page=1&limit=10`) |
| GET    | `/products/:id`            | Retorna um produto pelo ID                 |
| GET    | `/products/search?name=`   | Busca parcial por nome                     |
| POST   | `/products/create`         | Cria um novo produto                       |
| PUT    | `/products/:id`            | Atualiza dados de um produto               |
| DELETE | `/products/:id`            | Remove um produto                          |

---

## Regras de Negócio

-  O **CNPJ** de uma empresa deve ser único no sistema.
-  Cada **empresa não pode ter dois produtos com o mesmo nome**, mas empresas diferentes podem ter.
-  Exclusão de empresa **remove seus produtos automaticamente** (Cascade).

---

## 🛠 Como Rodar o Projeto

```bash
# 1. Clonar o repositório
git clone

# 2. Instalar dependências
npm install

# 3. Configurar o banco de dados
# Edite o arquivo .env.example para .env e coloque a URL do PostgreSQL:
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome-do-banco"

# 4. Aplicar as migrations
npx prisma migrate dev --name init

# 5. Rodar o projeto
npm run dev