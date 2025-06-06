FROM node:24.1-alpine3.20


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
CMD ["sh", "/app/entrypoint.sh"]
