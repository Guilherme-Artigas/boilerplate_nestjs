import { Injectable } from '@nestjs/common';
import { Product } from '../../../domain/entities/product';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { CreateProductDto } from '../../dtos/product/create-product.dto';

@Injectable()
export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(dto: CreateProductDto): Promise<void> {
    const product = new Product(
      dto.name,
      dto.description,
      dto.price,
      dto.companyId,
    );
    return await this.productRepository.create(product);
  }
}
