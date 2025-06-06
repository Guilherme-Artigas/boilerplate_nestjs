import { Product } from '@domain/company/subdomain/product/enterprise/entities/Product';

export interface IProductRepository {
  create(data: Product): Promise<Product>;
  save(data: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findOne(id: string): Promise<Product>;
  remove(id: string): Promise<void>;
}
