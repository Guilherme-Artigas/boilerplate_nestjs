import { DatabaseModule } from '../database/database.module';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { DATA_SOURCE, PRODUCT_REPOSITORY } from '@common/constants/repository.tokens';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CompaniesModule } from '../companies/companies.module';

const productProviders = [
    {
        provide: PRODUCT_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
        inject: [DATA_SOURCE],
    },
];

@Module({
    imports: [DatabaseModule, CompaniesModule],
    controllers: [ProductsController],
    providers: [ProductsService, ...productProviders],
})
export class ProductsModule {}
