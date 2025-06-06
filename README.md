# Joel Estumano | Boilerplate NestJS

### ✍️ Autor

Este projeto foi desenvolvido por Joel Estumano.

Contato: [joelestumano.com](https://www.joelestumano.com/)

Sinta-se à vontade para enviar sugestões, melhorias ou perguntas! 🚀

### 📌 Introdução

Este projeto foi criado para exemplificar a implementação de APIs REST, oferecendo uma estrutura pronta para CRUD de empresas e produtos, com integração a banco de dados, validação de dados e documentação automatizada.
Empresas podem ser cadastradas com informações como nome e logo, enquanto produtos são vinculados a empresas específicas, garantindo um relacionamento claro entre essas entidades.

### 🏢 Gerenciamento de Empresas e Produtos

O sistema permite que cada empresa tenha múltiplos produtos associados a ela, criando uma estrutura organizada para armazenar e gerenciar informações comerciais.
Ao criar um produto, é necessário informar a empresa à qual ele pertence, garantindo que a gestão dos produtos seja feita de forma correta e consistente.
Essa abordagem melhora a integridade dos dados e facilita a escalabilidade da aplicação.

### 🎯 Objetivo do Projeto

✅ Construir uma base sólida para projetos NestJS, seguindo boas práticas de desenvolvimento.
✅ Oferecer um projeto pronto para escalabilidade, com uma arquitetura organizada e modular.
✅ Implementar um exemplo funcional, incluindo operações CRUD (Create, Read, Update, Delete) para empresas e produtos.
✅ Providenciar uma infraestrutura inicial preparada para produção, integrando banco de dados, autenticação e documentação via Swagger.

🛠️ Tecnologias Utilizadas

- NestJS → Framework TypeScript para construção de APIs.
- TypeORM → ORM para interação com o banco de dados MySQL.
- Docker → Ambientes de desenvolvimento e produção padronizados.
- Swagger → Documentação da API integrada para facilitar testes.

### 📖 Documentação da API

Este projeto inclui Swagger para facilitar a exploração e teste dos endpoints da API.
🔹 Acessando a Documentação
Após iniciar o servidor, a documentação Swagger pode ser acessada nos seguintes endpoints:

- Swagger UI (Interface gráfica para testes)

```
http://localhost:3000/swagger
```

- Especificação OpenAPI (em JSON/YAML)

```
http://localhost:3000/swagger-json
```

✅ O Swagger
✔️ Permite visualizar todos os endpoints da API de forma organizada.
✔️ Possibilita testar requisições diretamente no navegador.
✔️ Facilita a integração com outras aplicações e ferramentas

![Figma](https://joel-estumano.github.io/public/img/apps/boilerplate_nestjs_swagger.png)

### 🚀 Instalação e Configuração

Para começar, siga os passos abaixo para baixar e configurar o projeto.

📌 1. Baixar o repositório
Clone o projeto do GitHub:

```
git clone https://github.com/joel-estumano/boilerplate_nestjs.git
```

📌 2. Configurar variáveis de ambiente
Copie o arquivo de exemplo `.env` para criar um ambiente local: `.env.local
`
Em seguida, edite o arquivo `.env.local` e configure os valores corretos para conexão ao banco de dados.

### 🔥 Executando o projeto

O projeto pode ser rodado localmente ou dentro de um container Docker.
✅ Rodando localmente
Caso prefira rodar sem Docker, instale as dependências e inicie o servidor:

```
npm install
```

```
npm run start:dev
```

Isso iniciará a API NestJS para desenvolvimento.

🐳 Rodando com Docker

Certifique-se de que você tem:

- Docker instalado [Informações e download aqui](https://www.docker.com/get-started/).
- Docker Compose configurado corretamente.

Caso queira usar Docker, basta rodar:

```
docker-compose up --build -d
```

Isso iniciará a API NestJS junto com o banco MySQL dentro de containers.
