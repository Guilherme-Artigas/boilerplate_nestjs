import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { ProductsController } from './controllers/products.controller'
import { ProductsService } from './services/products.service'
import { CompaniesModule } from '../companies/companies.module'
import { IProductsRepository } from '@/products/repositories/products.repository'
import { ProductsRepository } from '@/products/repositories/products.prisma.repository'

import { ICompaniesRepository } from '@/companies/repositories/companies.repository'
import { CompaniesRepository } from '@/companies/repositories/companies.prisma.repository'

@Module({
  imports: [PrismaModule, CompaniesModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: IProductsRepository,
      useClass: ProductsRepository,
    },
    {
      provide: ICompaniesRepository,
      useClass: CompaniesRepository,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
