import { NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../../domain/repositories/product.repository';

export class DeleteProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<void | null> {
    const product = await this.productRepository.delete(id);
    if (!product) {
      throw new NotFoundException(`o id: ${id} do produto não foi encontrado`);
    }
    return product;
  }
}
