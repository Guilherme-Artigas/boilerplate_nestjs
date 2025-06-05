# Produtos e Empresas API
# Boilerplate

CRUD de produtos e empresas usando **NestJS**, **Prisma**, **TypeORM** e **PostgreSQL**.

---

## ✨ Tecnologias Utilizadas

* **NestJS**
* **TypeORM** (para a entidade Produto)
* **Prisma ORM** (para integração com banco de dados e entidade Empresa)
* **PostgreSQL** (usando Supabase como hospedagem)
* **Swagger** (documentação de API)
* **TypeScript**

---

## 🚀 Funcionalidades

* Criar, listar, atualizar e excluir **empresas**
* Criar, listar, atualizar e excluir **produtos**
* Relacionamento entre produtos e empresas (1\:N)
* Documentação automática da API com Swagger

---

## 📁 Estrutura de Diretórios

```
src/
  empresa/
    empresa.entity.ts
    empresa.controller.ts
    empresa.service.ts
    empresa.module.ts

  produto/
    typeorm-produto.entity.ts
    produto.controller.ts
    produto.service.ts
    produto.module.ts

  main.ts
  app.module.ts
```

---

## 📆 Exemplo de .env

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```
DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco
```

Se estiver usando o Supabase, você pode copiar o valor da conexão Postgres diretamente no painel do projeto.

---

## 📅 Como rodar o projeto do zero

```bash
# 1. Clonar o repositório
$ git clone <url-do-repo>
$ cd nome-do-repo

# 2. Instalar dependências
$ npm install

# 3. Criar o arquivo .env
$ cp .env.example .env
# Edite o .env com a sua string do banco

# 4. Rodar a aplicação
$ npm run start:dev
```

> A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

---

## 🔍 Acessar Swagger

Após rodar o projeto, acesse:

**[http://localhost:3000/api](http://localhost:3000/api)**

Lá você pode testar todos os endpoints de produtos e empresas.

---

## 🚫 Problemas comuns.

### Banco não conecta

* Verifique se a string do `.env` está correta
* Teste a conexão ao banco usando ferramentas como DBeaver ou psql
* Supabase pode precisar liberar o IP (configure regras de acesso)

---

## ✅ TODO Futuro

* Autenticação com JWT
* Paginação e filtros na listagem de produtos/empresas
* Validações personalizadas com class-validator
