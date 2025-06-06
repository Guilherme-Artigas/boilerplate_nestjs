import { Manager } from '@domain/company/enterprise/entities/Manager';

export interface IManagerRepository {
  create(data: Manager): Promise<Manager>;
  save(data: Manager): Promise<Manager>;
  findAll(): Promise<Manager[]>;
  findOne(id: string): Promise<Manager>;
  remove(id: string): Promise<void>;
}
