import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Products } from './src/models/products.entity';
import { Company } from './src/models/company.entity';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_ROOT_USER,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Company, Products],
  migrations: ['src/migrations/*.ts'],
  extra: {
    connectionLimit: 5,
  },
});
