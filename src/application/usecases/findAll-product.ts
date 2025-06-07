import { Product } from '../../domain/entities/product';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class FindAllProducts {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
