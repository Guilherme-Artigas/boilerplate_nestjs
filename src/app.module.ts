import { Module } from "@nestjs/common";
import Joi = require("joi");
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        API_URL: Joi.string().uri().default('http://localhost:3000'),
        DATABASE_URL: Joi.string().uri().required(),
      }),
    }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      entities: [
      ],
      synchronize: true,

    }),

  ],
  controllers: [AppController],
  providers: [
  ],
})
export class AppModule {}