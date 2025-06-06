import { ILogger } from '@core/lib/logger/logger.interface';
import { IUseCase } from '@core/usecases/IUseCase';

import { IProductRepository } from '../../repositories/IProductRepository';
import {
  CreateProductInputDto,
  CreateProductOutputDto,
} from '../../types/product.types';
import { ICompanyRepository } from '@domain/company/application/repositories/ICompanyRepository';
import { Product } from '@domain/company/subdomain/product/enterprise/entities/Product';
import { Inject } from '@nestjs/common';

export class CreateProductUseCase implements IUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: CreateProductInputDto
  ): Promise<CreateProductOutputDto | undefined> {
    try {
      const company = await this.companyRepository.findOne(data.companyId);

      const product = Product.create({ ...data, company });
      await this.productRepository.create(product);

      return {
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        company,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
