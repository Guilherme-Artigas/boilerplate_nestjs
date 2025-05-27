import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../models/products.entity';
import { Company } from '../models/company.entity';
import { ProductsController } from './controllers/products.controller';
import { CreateProductService } from './services/create-product.service';
import { ListProductsService } from './services/list-products.service';
import { UpdateProductService } from './services/update-product.service';
import { DeleteProductsService } from './services/delete-products.service';
import { GetProductByIdService } from './services/get-product-by-id.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Company])],
  controllers: [ProductsController],
  providers: [
    CreateProductService,
    ListProductsService,
    UpdateProductService,
    DeleteProductsService,
    GetProductByIdService,
  ],
})
export class ProductsModule {}
