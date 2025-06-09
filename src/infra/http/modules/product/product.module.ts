import { Module } from '@nestjs/common';
import { ProductEntity } from '../../../typeorm/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProduct } from '../../../../application/usecases/product/create-product';
import { FindAllProducts } from '../../../../application/usecases/product/findAll-product';
import { ProductRepository } from '../../../../domain/repositories/product.repository';
import { ProductTypeormRepository } from '../../../typeorm/repositories/product-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [],
  providers: [
    CreateProduct,
    FindAllProducts,
    {
      provide: ProductRepository,
      useClass: ProductTypeormRepository,
    },
  ],
})
export class ProductModule {}
