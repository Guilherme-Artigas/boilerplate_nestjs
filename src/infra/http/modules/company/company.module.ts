import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../../../typeorm/entities/company.entity';
import { CreateCompany } from '../../../../application/usecases/company/create-company';
import { FindAllCompany } from '../../../../application/usecases/company/findAll-company';
import { CompanyRepository } from '../../../../domain/repositories/company.repository';
import { CompanyTypeormRepository } from '../../../typeorm/repositories/company-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [],
  providers: [
    CreateCompany,
    FindAllCompany,
    {
      provide: CompanyRepository,
      useClass: CompanyTypeormRepository,
    },
  ],
})
export class CompanyModule {}
