import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CompanyController } from './controllers/company/company.controller';
import { ProductController } from './controllers/product/product.controller';
import { CompanyModule } from './controllers/company/company.module';
import { ProductModule } from './controllers/product/product.module';
import { ProductUseCaseFacade } from '@domain/company/subdomain/product/application/facade/ProductUseCaseFacade';
import { CompanyUseCaseFacade } from '@domain/company/application/facade/CompanyUseCaseFacade';
import { ManagerModule } from './controllers/manager/manager.module';
import { LoggerModule } from '@shared/logger/logger.module';

@Module({
  imports: [
    DatabaseModule,
    CompanyModule,
    ProductModule,
    ManagerModule,
    LoggerModule,
  ],
  controllers: [CompanyController, ProductController],
  providers: [CompanyUseCaseFacade, ProductUseCaseFacade],
})
export class HttpModule {}
