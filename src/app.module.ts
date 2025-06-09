import { Module } from '@nestjs/common';
import { CompanyModule } from './infra/http/modules/company/company.module';
import { ResponsibleModule } from './infra/http/modules/responsible/responsible.module';
import { ProductModule } from './infra/http/modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infra/database/typeorm/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CompanyModule,
    ResponsibleModule,
    ProductModule,
  ],
})
export class AppModule {}
