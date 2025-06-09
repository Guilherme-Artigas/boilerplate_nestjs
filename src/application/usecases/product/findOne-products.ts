import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../../domain/entities/product';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class FindOneProducts {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`id: ${id} de produto não encontrado`);
    }
    return product;
  }
}
