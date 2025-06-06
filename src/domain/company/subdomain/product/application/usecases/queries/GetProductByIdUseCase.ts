import { IUseCase } from '@core/usecases/IUseCase';
import { IProductRepository } from '../../repositories/IProductRepository';
import { ILogger } from '@core/lib/logger/logger.interface';
import { CustomError } from '@core/errors/CustomError';
import {
  GetProductByIdInputDto,
  GetProductByIdOutputDto,
} from '../../types/product.types';
import { Inject } from '@nestjs/common';

export class GetProductByIdUseCase implements IUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: GetProductByIdInputDto
  ): Promise<GetProductByIdOutputDto | undefined> {
    try {
      const product = await this.productRepository.findOne(data.id);

      if (!product) {
        this.logger.error(
          `Product with id ${data.id} not found`,
          new CustomError('NotFound', 404)
        );
        throw new CustomError(`Product with id ${data.id} not found`, 404);
      }
      return {
        id: product.id.toString(),
        name: product.name,
        company: product.company,
        description: product.description,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
