# Boilerplate NestJS (Express + ES Modules)
Este projeto é um boilerplate simples para uma API RESTful utilizando Express, ES Modules e estrutura inspirada no NestJS.

## Funcionalidades
1. CRUD de Produtos
2. CRUD de Empresas
3. Estrutura modular (controllers, models, routes)
4. Uso de ES6 Modules (import/export)
5. MONGODB cloud como banco de dados

## Estrutura de Pastas
- controllers/   # Lógica dos endpoints
- models/        # Modelos de dados (ex: Mongoose)
- routes/        # Rotas da aplicação
- lib/           # Utilitários e configurações (ex: database.js)
- app.js         # Ponto de entrada da aplicação

## Instalação
- git clone <repo-url>
- cd boilerplate_nestjs
- npm install
- Crie um arquivo .env com as seguintes variáveis: PORT = 3000 e MONGO_URI=(URI do MongoDB que vc criar)

## Instalação do Banco de Dados MongoDB
1. Instale o MongoDB localmente ou crie uma conta no MongoDB Atlas.

2. Crie um banco de dados e obtenha a string de conexão (exemplo: mongodb://localhost:27017/seubanco ou uma URI do Atlas).

3. No arquivo database.js, configure a conexão substituindo a URI pelo seu endereço do MongoDB.

4. Certifique-se de que o MongoDB está rodando antes de iniciar a aplicação.

## Como rodar
A aplicação irá rodar por padrão em http://localhost:3000.

## Endpoints principais
### PRODUTOS:
- GET /products — Lista todos os produtos
- POST /products — Adiciona um produto
- DELETE /products/:id — Remove um produto
- PATCH /products/:id — Atualiza um produto

### EMPRESAS
- GET /partners — Lista todas as empresas
- POST /partners — Adiciona uma empresa
- DELETE /partners/:id — Remove uma empresa
- PATCH /partners/:id — Atualiza uma empresa

## Observações
- Certifique-se de que o package.json contém: "type": "module" para habilitar ES Modules.
- O projeto está pronto para integração com banco de dados MongoDB via Mongoose (ajuste o arquivo database.js conforme necessário).
