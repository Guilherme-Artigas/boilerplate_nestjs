import { Product } from '../../../domain/entities/product';
import { ProductRepository } from '../../../domain/repositories/product.repository';

export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(product: Product): Promise<void> {
    return await this.productRepository.create(product);
  }
}
