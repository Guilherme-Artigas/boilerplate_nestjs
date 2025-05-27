# API de Gerenciamento de Empresas e Produtos

Esta é uma API RESTful desenvolvida com NestJS para gerenciamento de empresas e seus produtos.

## Tecnologias Utilizadas

- NestJS
- TypeORM
- MySQL
- Docker
- Swagger (Documentação da API)

## Estrutura do Projeto

```
src/
├── models/              # Entidades do banco de dados
├── company/            # Módulo de empresas
│   ├── controllers/    # Controladores
│   ├── services/      # Serviços
│   └── dto/           # Data Transfer Objects
├── products/          # Módulo de produtos
│   ├── controllers/   # Controladores
│   ├── services/     # Serviços
│   └── dto/          # Data Transfer Objects
└── migrations/        # Migrações do banco de dados
```

## Requisitos

- Docker
- Docker Compose
- Node.js 18+

## Configuração do Ambiente

1. Clone o repositório
2. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente
3. Execute o comando para iniciar os containers:
```bash
docker compose up -d
```

## Endpoints da API

### Empresas (Companies)

#### Listar Empresas
- **GET** `/companies`
- **Query Params:**
  - `isAvailable` (opcional): boolean - Filtra empresas ativas/inativas
- **Retorno:**
  ```json
  {
    "data": [
      {
        "id": "string",
        "name": "string",
        "document": "string",
        "email": "string",
        "phone": "string",
        "isAvailable": boolean,
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "total": number
  }
  ```

#### Buscar Empresa por ID
- **GET** `/companies/:id`
- **Retorno:**
  ```json
  {
    "id": "string",
    "name": "string",
    "document": "string",
    "email": "string",
    "phone": "string",
    "isAvailable": boolean,
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
- **Erros:**
  - 404: Empresa não encontrada ou está desativada

#### Criar Empresa
- **POST** `/companies`
- **Body:**
  ```json
  {
    "name": "string",
    "document": "string",
    "email": "string",
    "phone": "string"
  }
  ```
- **Retorno:** Empresa criada
- **Erros:**
  - 400: Dados inválidos
  - 409: Email ou documento já cadastrado

#### Atualizar Empresa
- **PATCH** `/companies/:id`
- **Body:** Mesmos campos do POST
- **Retorno:** Empresa atualizada
- **Erros:**
  - 404: Empresa não encontrada
  - 409: Email ou documento já cadastrado

#### Desativar Empresa
- **DELETE** `/companies/:id`
- **Retorno:** Empresa desativada
- **Erros:**
  - 404: Empresa não encontrada
  - 400: Não é possível desativar uma empresa com produtos

### Produtos (Products)

#### Listar Produtos
- **GET** `/products`
- **Query Params:**
  - `companyId` (opcional): string - Filtra produtos por empresa
- **Retorno:**
  ```json
  {
    "data": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": number,
        "companyId": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "total": number
  }
  ```

#### Buscar Produto por ID
- **GET** `/products/:id`
- **Retorno:** Produto encontrado
- **Erros:**
  - 404: Produto não encontrado

#### Criar Produto
- **POST** `/products`
- **Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
    "companyId": "string"
  }
  ```
- **Retorno:** Produto criado
- **Erros:**
  - 400: Dados inválidos
  - 404: Empresa não encontrada ou está desativada

#### Atualizar Produto
- **PATCH** `/products/:id`
- **Body:** Mesmos campos do POST
- **Retorno:** Produto atualizado
- **Erros:**
  - 404: Produto não encontrado

#### Deletar Produto
- **DELETE** `/products/:id`
- **Retorno:** Produto deletado
- **Erros:**
  - 404: Produto não encontrado

## Regras de Negócio

### Empresas
1. Uma empresa pode ser ativada ou desativada
2. Empresas desativadas não podem ter produtos
3. Não é possível desativar uma empresa que possui produtos
4. Email e documento devem ser únicos no sistema

### Produtos
1. Produtos só podem ser criados para empresas ativas
2. Produtos são vinculados a uma única empresa
3. Ao desativar uma empresa, todos os seus produtos devem ser removidos

## Documentação Swagger

A documentação completa da API está disponível em:
```
http://localhost:3000/docs
```

## Testes

Para executar os testes:
```bash
npm run test
```