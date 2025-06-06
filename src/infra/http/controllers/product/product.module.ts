import { CreateProductUseCase } from '@domain/company/subdomain/product/application/usecases/commands/CreateProductUseCase';
import { DeleteProductUseCase } from '@domain/company/subdomain/product/application/usecases/commands/DeleteProductUseCase';
import { UpdateProductUseCase } from '@domain/company/subdomain/product/application/usecases/commands/UpdateProductUseCase';
import { GetProductByIdUseCase } from '@domain/company/subdomain/product/application/usecases/queries/GetProductByIdUseCase';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { GetProductsUseCase } from '@domain/company/subdomain/product/application/usecases/queries/GetProductsUseCase';
import { ProductRepository } from '@infra/database/prisma/repositories/product.repository';
import { CompanyRepository } from '@infra/database/prisma/repositories/company.repository';
import { DatabaseModule } from '@infra/database/database.module';
import { LoggerModule } from '@shared/logger/logger.module';
import { ProductUseCaseFacade } from '@domain/company/subdomain/product/application/facade/ProductUseCaseFacade';

const usecases = [
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  GetProductByIdUseCase,
  GetProductsUseCase,
];

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [ProductController],
  providers: [
    ...usecases,
    ProductUseCaseFacade,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
  exports: [...usecases, ProductUseCaseFacade],
})
export class ProductModule {}
