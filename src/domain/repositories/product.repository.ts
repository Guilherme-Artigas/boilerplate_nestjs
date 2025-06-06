import { Product } from '../entities/product';

export abstract class ProductRepository {
  abstract findAll(): Promise<Product[]>;
  abstract create(product: Product): Promise<void>;
  abstract findOne(id: string): Promise<Product | null>;
  abstract delete(id: string): Promise<void>;
}
