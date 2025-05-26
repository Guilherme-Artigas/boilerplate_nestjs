import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../models/products.entity';
import { ProductsController } from './controllers/products.controller';
import { CreateProductService } from './services/create-product.service';
import { ListProductsService } from './services/list-products.service';
import { UpdateProductService } from './services/update-product.service';
import { DeleteProductsService } from './services/delete-products.service';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), CompanyModule],
  controllers: [ProductsController],
  providers: [
    CreateProductService,
    ListProductsService,
    UpdateProductService,
    DeleteProductsService,
  ],
})
export class ProductsModule {}
