import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../../models/products.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { Company } from '../../models/company.entity';

@Injectable()
export class CreateProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<Products> {
    const company = await this.companyRepository.findOne({
      where: {
        id: createProductDto.companyId,
        isAvailable: true,
      },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada ou está desativada');
    }

    const product = this.productsRepository.create({
      ...createProductDto,
      company: company,
    });
    return await this.productsRepository.save(product);
  }
}
