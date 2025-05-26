FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
