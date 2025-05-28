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
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'company_db',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Company, Products],
      synchronize: true,
      extra: {
        connectionLimit: 5,
      },
    }),
    CompanyModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('Database Configuration:', {
      host: 'company_db',
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
    });
  }
}
