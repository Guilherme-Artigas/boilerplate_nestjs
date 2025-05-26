import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Products } from './src/models/products.entity';
import { Company } from './src/models/company.entity';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  entities: [Company, Products],
  migrations: ['src/migrations/*.ts'],
});
