import { Module } from '@nestjs/common';
import { ProductEntity } from '../../../typeorm/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProduct } from '../../../../application/usecases/product/create-product';
import { FindAllProducts } from '../../../../application/usecases/product/findAll-product';
import { ProductRepository } from '../../../../domain/repositories/product.repository';
import { ProductTypeormRepository } from '../../../typeorm/repositories/product-typeorm.repository';
import { ProductController } from '../../controllers/product.controller';
import { FindOneProducts } from '../../../../application/usecases/product/findOne-products';
import { DeleteProduct } from '../../../../application/usecases/product/delete-product';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    CreateProduct,
    FindAllProducts,
    FindOneProducts,
    DeleteProduct,
    {
      provide: ProductRepository,
      useClass: ProductTypeormRepository,
    },
  ],
})
export class ProductModule {}
