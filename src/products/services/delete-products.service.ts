import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../../models/products.entity';

@Injectable()
export class DeleteProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async execute(id: string): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    product.isAvailable = false;
    return this.productsRepository.save(product);
  }
}
