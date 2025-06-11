# API de Gerenciamento de Empresas e Produtos

API RESTful para gerenciamento de empresas e produtos construída com NestJS, Prisma ORM e PostgreSQL, seguindo as melhores práticas de desenvolvimento.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Configuração](#configuração)
- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [API Endpoints](#api-endpoints)
- [Validação de Dados](#validação-de-dados)
- [CORS](#cors)
- [Testes](#testes)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)

## Visão Geral

Este projeto implementa uma API RESTful para gerenciamento de empresas e seus produtos. A aplicação permite cadastrar empresas com validação de CNPJ e registrar produtos associados a essas empresas. O sistema utiliza PostgreSQL como banco de dados, Prisma ORM para acesso aos dados, e fornece documentação via Swagger UI.

## Tecnologias

- **NestJS**: Framework para construção de aplicações server-side eficientes e escaláveis
- **TypeScript**: Linguagem de programação principal
- **PostgreSQL**: Banco de dados relacional
- **Prisma**: ORM para acesso e manipulação do banco de dados
- **Class Validator**: Validações de entrada de dados
- **Swagger**: Documentação da API
- **CPF/CNPJ Validator**: Biblioteca para validação de documentos brasileiros

## Estrutura do Projeto

A aplicação segue uma arquitetura modular, separando as responsabilidades em módulos distintos:

```
src/
├── common/                # Utilitários compartilhados
│   ├── decorators/        # Decoradores personalizados
│   └── validators/        # Validadores personalizados
├── config/                # Configurações da aplicação
│   ├── app.config.ts      # Configurações gerais
│   └── cors.config.ts     # Configuração de CORS
├── prisma/                # Camada de acesso ao banco de dados
│   ├── prisma.module.ts   # Módulo do Prisma
│   └── prisma.service.ts  # Serviço do Prisma
├── company/               # Módulo de empresas
│   ├── company.controller.ts
│   ├── company.module.ts
│   ├── company.service.ts
│   └── dto/
│       ├── create-company.dto.ts
│       └── update-company.dto.ts
├── product/               # Módulo de produtos
│   ├── product.controller.ts
│   ├── product.module.ts
│   ├── product.service.ts
│   └── dto/
│       ├── create-product.dto.ts
│       └── update-product.dto.ts
├── app.module.ts          # Módulo principal
└── main.ts                # Ponto de entrada da aplicação
```

## Funcionalidades

- **Gestão de Empresas**: CRUD completo para empresas com validação de CNPJ
- **Gestão de Produtos**: CRUD completo para produtos com relação a uma empresa específica
- **Validação de Dados**: Validação de inputs utilizando class-validator e decoradores personalizados
- **Documentação**: Documentação da API completa via Swagger UI
- **CORS Configurável**: Configuração de CORS via variáveis de ambiente

## Configuração

As configurações da aplicação são gerenciadas através de variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto seguindo o exemplo abaixo:

```env
# Database connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/products_db?schema=public"

# CORS configuration (comma-separated list of allowed origins)
CORS_ORIGINS="http://localhost:3000,http://localhost:5173,http://localhost:4200"

# Application port
PORT=3000
```

## Instalação

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npm run prisma:generate

# Aplicar migrations
npm run prisma:migrate:dev
```

## Executando o Projeto

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run build
npm run start:prod

# Visualizar banco de dados (Prisma Studio)
npm run prisma:studio
```

## API Endpoints

### Empresas

- `GET /companies` - Listar todas as empresas
- `GET /companies/:id` - Buscar uma empresa específica
- `POST /companies` - Criar uma nova empresa
- `PATCH /companies/:id` - Atualizar uma empresa
- `DELETE /companies/:id` - Excluir uma empresa

### Produtos

- `GET /products` - Listar todos os produtos
- `GET /products/:id` - Buscar um produto específico
- `GET /products/company/:id` - Listar produtos de uma empresa
- `POST /products` - Criar um novo produto
- `PATCH /products/:id` - Atualizar um produto
- `DELETE /products/:id` - Excluir um produto

## Validação de Dados

A aplicação implementa validação rigorosa de dados:

- **CNPJ**: Validação de formato e cálculo de dígitos verificadores
- **Campos Obrigatórios**: Verificação de campos obrigatórios como nome, preço, etc.
- **Tipos de Dados**: Validação de tipos (strings, números, etc.)

Exemplo de validador CNPJ:

```typescript
@IsNotEmpty()
@IsString()
@IsCnpj({ message: 'CNPJ inválido' })
cnpj: string;
```

## CORS

A configuração de CORS é gerenciada via variável de ambiente `CORS_ORIGINS`, que aceita:

- Uma lista de origens separadas por vírgula
- `*` para permitir qualquer origem
- Combinações de origens específicas e wildcards

## Testes

```bash
# Testes unitários
npm run test

# Testes end-to-end
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## Documentação da API

A documentação Swagger está disponível durante o desenvolvimento em:

```
http://localhost:3000/api
```

## Estrutura do Banco de Dados

### Tabela: companies

| Coluna     | Tipo      | Descrição                          |
|------------|-----------|-----------------------------------|
| id         | Int       | ID primário, auto incrementável    |
| name       | String    | Nome da empresa                    |
| cnpj       | String    | CNPJ, único                        |
| address    | String?   | Endereço (opcional)                |
| created_at | DateTime  | Data de criação                    |
| updated_at | DateTime  | Data de atualização                |

### Tabela: products

| Coluna      | Tipo     | Descrição                          |
|-------------|----------|-----------------------------------|
| id          | Int      | ID primário, auto incrementável    |
| name        | String   | Nome do produto                    |
| description | String?  | Descrição (opcional)               |
| price       | Float    | Preço                              |
| stock       | Int      | Quantidade em estoque              |
| company_id  | Int      | ID da empresa (chave estrangeira)  |
| created_at  | DateTime | Data de criação                    |
| updated_at  | DateTime | Data de atualização                |
