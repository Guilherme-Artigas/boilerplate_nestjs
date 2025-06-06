import { ILogger } from '@core/lib/logger/logger.interface';
import { IProductRepository } from '../../repositories/IProductRepository';
import { IUseCase } from '@core/usecases/IUseCase';
import {
  UpdateProductInputDto,
  UpdateProductOutputDto,
} from '../../types/product.types';
import { Product } from '@domain/company/subdomain/product/enterprise/entities/Product';
import { CustomError } from '@core/errors/CustomError';
import { UniqueEntityID } from '@core/entities/UniqueEntityId';
import { ICompanyRepository } from '@domain/company/application/repositories/ICompanyRepository';
import { Inject } from '@nestjs/common';

export class UpdateProductUseCase implements IUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: UpdateProductInputDto
  ): Promise<UpdateProductOutputDto | undefined> {
    try {
      const product = await this.productRepository.findOne(data.id);
      if (!product) {
        this.logger.error(
          `Product with id ${data.id} not found`,
          new CustomError('NotFound', 404)
        );
        throw new CustomError(`Product with id ${data.id} not found`, 404);
      }

      const company = await this.companyRepository.findOne(data.companyId);
      const updatedProduct = Product.create(
        {
          ...product,
          name: data.name || product.name,
          description: data.description || product.description,
          price: data.price || product.price,
          company,
        },
        new UniqueEntityID(data.id || product.id.toString())
      );

      const result = await this.productRepository.save(updatedProduct);

      return {
        id: result.id.toString(),
        name: result.name,
        company,
        description: result.description,
        price: result.price,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
