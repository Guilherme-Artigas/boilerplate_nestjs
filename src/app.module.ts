import { Module } from '@nestjs/common';
import Joi = require('joi');
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { Company } from './models/company.entity';
import { Products } from './models/products.entity';
import { CompanyModule } from './company/company.module';
import { ProductsModule } from './products/products.module';

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
      entities: [Company, Products],
      synchronize: false,
      migrations: ['src/migrations/*.ts'],
      migrationsRun: true,
    }),
    CompanyModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
