import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../../models/products.entity';
import { ListProductsDto } from '../dto/list-products.dto';

@Injectable()
export class ListProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async execute(query: ListProductsDto): Promise<{ data: Products[]; total: number }> {
    const { page = 1, limit = 10, isAvailable } = query;

    const where: any = {};
    if (isAvailable !== undefined) {
      where.isAvailable = isAvailable === 'true' ? true : false;
    }

    const [data, total] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['company'],
      where,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data,
      total,
    };
  }
}
