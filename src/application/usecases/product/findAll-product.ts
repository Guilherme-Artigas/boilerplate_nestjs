import { Injectable } from '@nestjs/common';
import { Product } from '../../../domain/entities/product';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class FindAllProducts {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
