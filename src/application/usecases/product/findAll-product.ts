import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';

@Injectable()
export class FindAllProducts {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.findAll();
    return products.map((product) => ProductResponseDto.fromDomain(product));
  }
}
