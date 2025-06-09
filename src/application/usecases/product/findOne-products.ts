import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';

@Injectable()
export class FindOneProducts {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`id: ${id} de produto não encontrado`);
    }
    return ProductResponseDto.fromDomain(product);
  }
}
