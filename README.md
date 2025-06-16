# A gestora - Documentação

Este projeto implementa uma API RESTful para gerenciamento de empresas e produtos, utilizando NestJS, Prisma ORM e PostgreSQL, seguindo os princípios SOLID e Clean Code.


## Projeto

### Estrutura de pastas
O projeto segue uma organização por funcionalidade:

```
src/
├── companies/               # Tudo relacionado a empresas
│   ├── entities/            # Entidades de empresa
│   ├── dtos/                # DTOs de empresa
│   ├── repositories/        # Repositórios de empresa
│   ├── services/            # Serviços de empresa
│   ├── controllers/         # Controllers de empresa
│   └── companies.module.ts  # Módulo de empresas
│
├── products/               # Tudo relacionado a produtos
│   ├── entities/            # Entidades de produto
│   ├── dtos/                # DTOs de produto
│   ├── repositories/        # Repositórios de produto
│   ├── services/            # Serviços de produto
│   ├── controllers/         # Controllers de produto
│   └── products.module.ts  # Módulo de produtos
|
│   [...]
│
└── main.ts                  # Ponto de entrada da aplicação
```

### Alguns do Princípios SOLID Aplicados

- **S (Single Responsibility Principle):** Cada componente (controlador, serviço, repositório, DTO) possui uma única responsabilidade bem definida. Por exemplo, os Controllers lidam apenas com requisições HTTP, os Services contêm a lógica de negócio e os Repositories gerenciam a persistência de dados.
- **O (Open/Closed Principle):** O uso de interfaces para os repositórios (ICompaniesRepository, IProductsRepository) permite que novas implementações de persistência sejam adicionadas sem modificar o código existente dos serviços, que dependem apenas da abstração.
- **I (Interface Segregation Principle):** As interfaces dos repositórios são específicas para cada entidade, evitando que classes sejam forçadas a implementar métodos que não utilizam. Cada interface define apenas as operações relevantes para sua respectiva entidade.


### Principais pincípios de Domain-Driven Design (DDD) Utilizados
- Entidades: Modelagem de conceitos de negócio com identidade única (ex: Empresa, Produto).
- Repositórios: Abstração da camada de persistência de dados.
- Serviços: Encapsulamento da lógica de negócio e orquestração de operações.

------
------

### :rocket: Principais Tecnologias Utilizadas
- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
  
## Como executar o projeto localmente
Para executar que o projeto seja executado localmente, são necessárias algumas configurações:
- [node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/getting-started/install)
- [Docker](https://docs.docker.com/engine/installation/) e [Docker Compose](https://docs.docker.com/compose/install/) para execuçaão banco de dados **Postgres**

### Passo a passo
1. Clone o repositorio

2. Acesse a pasta do projeto:
```
cd api
```

3. Instale as dependências:

```
npm run build
# ou
yarn build
```

4. Configure o arquivo `.env` com a URL de conexão do PostgreSQL:
   ```
   DATABASE_NAME=gestora_db
   DATABASE_USERNAME=admin
   DATABASE_PASSWORD=1234

   DATABASE_URL="postgresql://admin:1234@localhost:5432/gestora_db?schema=public"
   ```
   
5. Crie e inicie o container de serviço do banco de dados:
   ```
   docker-compose up
   ```
   
6. Execute as migrações do Prisma:
   ```
   npx prisma migrate dev
   ```
   
7. Inicie o servidor:
   ```
   yarn start:dev
   ```


### Documentação Swagger

A documentação completa da API está disponível através do Swagger UI em:

```
http://localhost:3000/api
```
