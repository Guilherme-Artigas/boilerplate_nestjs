import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  entities: [
  ],
  migrations: ['src/migrations/*.ts'],
}); 