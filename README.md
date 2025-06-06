# Documentação de Estrutura e Funcionamento do Projeto

<!-- TOC -->
- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Uso Local](#instalação-e-uso-local)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Principais Diretórios](#principais-diretórios)
- [Principais Componentes](#principais-componentes)
- [Fluxo de Funcionamento](#fluxo-de-funcionamento)
- [Convenções Importantes](#convenções-importantes)
- [Exemplos de Uso](#exemplos-de-uso)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Úteis](#scripts-úteis)
- [Troubleshooting](#troubleshooting)
- [Roadmap / TODO](#roadmap--todo)
- [Licença](#licença)
- [Créditos](#créditos)
<!-- /TOC -->

## Visão Geral

Este projeto é um **boilerplate** para aplicações backend utilizando [NestJS](https://nestjs.com/), com arquitetura modular, integração com banco de dados PostgreSQL via Prisma ORM, e práticas modernas de organização de código, testes e logging.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [VS Code](https://code.visualstudio.com/) + extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Instalação e Uso Local

```bash
# Clone o repositório
$ git clone <repo-url>
$ cd boilerplate_nestjs

# Copie o arquivo de variáveis de ambiente
$ cp .env.example .env

# Suba o ambiente completo na primeira vez
$ yarn compose:up

# Após rodar o comando acima pela primeira vez
$ docker-compose up

```

---

## Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/):** Framework Node.js para construção de APIs escaláveis e testáveis.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript com tipagem estática.
- **[Prisma ORM](https://www.prisma.io/):** ORM moderno para Node.js e TypeScript.
- **[PostgreSQL](https://www.postgresql.org/):** Banco de dados relacional open source.
- **[Docker](https://www.docker.com/):** Contêineres para ambiente de desenvolvimento e produção.
- **[Swagger](https://swagger.io/):** Documentação automática de API.
- **[Winston](https://github.com/winstonjs/winston):** Logger flexível para Node.js.
- **[Morgan](https://github.com/expressjs/morgan):** Middleware de logging HTTP.
- **REST Client (VS Code):** Testes de API via arquivos `.http`.

---

## Estrutura de Pastas

```
src/
  app.module.ts
  main.ts
  core/
    entities/
    errors/
    facade/
    lib/
    usecases/
  domain/
    company/
      application/
        facade/
        repositories/
        types/
        usecases/
      enterprise/
      subdomain/
  infra/
    database/
      prisma/
      repositories/
    http/
      controllers/
      dto/
      modules/
  shared/
    logger/
    middlewares/
```

### Principais Diretórios

- **core/**: Contratos, entidades base, interfaces e utilitários genéricos.
- **domain/**: Lógica de negócio, entidades, casos de uso e tipos do domínio.
- **infra/**: Implementações de infraestrutura (banco, HTTP, repositórios).
- **shared/**: Componentes compartilhados como logger e middlewares.

---

## Principais Componentes

- **Controllers:** Recebem as requisições HTTP e delegam para os casos de uso.
- **UseCases:** Implementam a lógica de negócio de cada operação.
- **Repositories:** Abstraem o acesso ao banco de dados.
- **DTOs:** Definem os contratos de entrada e saída das operações.
- **Entities:** Representam os objetos de domínio.
- **Logger:** Centraliza logs de aplicação e requisições HTTP.
- **Middlewares:** Tratamento de exceções, logging, etc.

---

## Fluxo de Funcionamento

1. **Subida dos containers:**  
   Execute `docker-compose up --build` para subir o ambiente completo (backend e banco de dados).

2. **Inicialização:**  
   O backend aguarda o banco de dados ficar pronto, executa as migrations do Prisma e inicia o servidor NestJS.

3. **Acesso à documentação:**  
   Acesse a documentação Swagger em `http://localhost:4000/api`.

4. **Testes de API:**  
   Utilize o arquivo `request.http` com a extensão REST Client do VS Code para testar os endpoints.

---

## Convenções Importantes

- **Variáveis de ambiente:** Definidas no arquivo `.env` na raiz do projeto.
- **Migrations:** Executadas automaticamente no entrypoint do container backend.
- **Portas padrão:** Backend em `4000`, banco em `5432`.
- **Documentação Swagger:** Disponível em `/api`.

---

## Exemplos de Uso

### Criar um gerente e usar o ID em outras requisições

```http
// @name createManager
POST http://localhost:4000/manager
Content-Type: application/json

{
  "name": "Carlos ancelloti",
  "email": "carlao.ancelloti@example.com",
  "phone": "11988887777",
  "cpf": "12345678909"
}

###

@managerId = {{createManager.response.body.$.id}}

POST http://localhost:4000/company
Content-Type: application/json

{
  "name": "Empresa Exemplo",
  "cnpj": "12345678000100",
  "managerId": "{{managerId}}"
}
```

---

## Variáveis de Ambiente

- `DATABASE_URL`: URL de conexão do Prisma com o PostgreSQL (ajustada para uso entre containers)
- `POSTGRES_USER`: Usuário do banco de dados PostgreSQL (usado no docker-compose)
- `POSTGRES_PASSWORD`: Senha do usuário do banco de dados PostgreSQL (usado no docker-compose)
- `POSTGRES_DB`: Nome do banco de dados PostgreSQL (usado no docker-compose)
- `PGDATA`: Caminho do diretório de dados do PostgreSQL (usado no docker-compose)
- `PORT`: Porta do backend (padrão: 4000)
- `NODE_ENV`: Ambiente de execução do Node.js (ex: development)
- Outras variáveis podem ser adicionadas conforme novas features

## Scripts Úteis

- `npm run start:dev`: Sobe o backend em modo desenvolvimento
- `npm run test`: Executa os testes unitários
- `npm run lint`: Executa o linter
- `npx prisma migrate dev`: Executa migrations em ambiente de desenvolvimento
- `npx prisma studio`: Abre o Prisma Studio para visualizar o banco

## Troubleshooting

- **Permissão negada no entrypoint.sh:**
  - Rode: `chmod +x entrypoint.sh`
- **Porta em uso:**
  - Altere a porta no `.env` ou pare o serviço que está usando a porta.
- **Banco não conecta:**
  - Verifique se o serviço do banco está de pé e se a `DATABASE_URL` está correta.

## Roadmap / TODO

- [ ] Implementar autenticação e autorização
- [ ] Adicionar testes de integração
- [ ] Melhorar cobertura de testes
- [ ] Adicionar CI/CD
- [ ] Documentar endpoints privados/públicos

## Licença

MIT

## Créditos

Desenvolvido por Danrllei Miranda.

---

## Observações

- O projeto segue princípios de Clean Architecture e DDD para facilitar manutenção e escalabilidade.
- O uso de Docker garante portabilidade e facilidade de setup do ambiente.
- O código está preparado para testes automatizados e integração contínua.
- **Atenção:** A autenticação ainda não foi implementada e precisa ser adicionada nas próximas etapas do projeto.

---