import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './modules/companies/companies.module';
import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';

@Module({
    imports: [CompaniesModule, ProductsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
