import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CompanyModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
