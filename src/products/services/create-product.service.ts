import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../../models/products.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<Products> {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }
}
