# Inicializando o projeto

Para inicializar o projeto, basta executar o comando `npm install` ou `yarn install` na pasta raiz do projeto.

# Comandos

Os comandos para executar o projeto são:

* `npm run start` ou `yarn start`: Inicia o servidor do Nest em modo de desenvolvimento.
* `npm run build` ou `yarn build`: Compila o projeto e gera o código JavaScript para produção.
* `npm run test` ou `yarn test`: Executa os testes unitários do projeto.
* `npm run test:e2e` ou `yarn test:e2e`: Executa os testes de ponta a ponta do projeto.

# Pastas

O projeto é dividido em quatro pastas principais:

* `src`: Contém o código fonte do projeto.
* `test`: Contém os testes unitários e de ponta a ponta do projeto.
* `dist`: Contém o código JavaScript compilado para produção.
* `prisma`: Contém os arquivos de configuração e modelos do Prisma.

# Configuração do Prisma

Para configurar o Prisma, basta criar um arquivo chamado `prisma/schema.prisma` com o seguinte conteúdo:

model Company {
  id       Int     @id @default(autoincrement())
  name     String
  cnpj     String   @unique
  products Product[]
}

model Product {
  id        Int     @id @default(autoincrement())
  name      String
  price     Decimal
  companyId Int     @relation(fields: [companyId], references: [id])
  company   Company @relation(fields: [companyId], references: [id])
}

Em seguida, execute o comando `npx prisma migrate dev` para criar as tabelas no banco de dados.

# Iniciando o servidor

Para iniciar o servidor, basta executar o comando `npm run start` ou `yarn start`. O servidor estará disponível em `http://localhost:3000`.

# Rotas

As rotas do projeto são:

* `GET /companies`: Retorna uma lista de todas as empresas.
* `GET /companies/:id`: Retorna a empresa com o ID especificado.
* `POST /companies`: Cria uma nova empresa.
* `PUT /companies/:id`: Atualiza a empresa com o ID especificado.
* `DELETE /companies/:id`: Deleta a empresa com o ID especificado.

* `GET /products`: Retorna uma lista de todos os produtos.
* `GET /products/:id`: Retorna o produto com o ID especificado.
* `POST /products`: Cria um novo produto.
* `PUT /products/:id`: Atualiza o produto com o ID especificado.
* `DELETE /products/:id`: Deleta o produto com o ID especificado.
