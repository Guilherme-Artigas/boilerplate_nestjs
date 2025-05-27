import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../models/company.entity';
import { CompanyController } from './controllers/company.controller';
import { CreateCompanyService } from './services/create-company.service';
import { ListCompanyService } from './services/list-company.service';
import { GetCompanyByIdService } from './services/get-company-by-id.service';
import { UpdateCompanyService } from './services/update-company.service';
import { DeleteCompanyService } from './services/delete-company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [
    CreateCompanyService,
    ListCompanyService,
    GetCompanyByIdService,
    UpdateCompanyService,
    DeleteCompanyService,
  ],
  exports: [CreateCompanyService],
})
export class CompanyModule {}
