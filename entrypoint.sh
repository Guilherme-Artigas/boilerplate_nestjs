#!/bin/sh

npx prisma db wait

npx prisma migrate dev

npm run start:dev