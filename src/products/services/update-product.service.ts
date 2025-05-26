import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../../models/products.entity';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async execute(id: string, updateProductDto: UpdateProductDto): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    // Atualiza apenas os campos fornecidos
    Object.assign(product, updateProductDto);

    return this.productsRepository.save(product);
  }
}
