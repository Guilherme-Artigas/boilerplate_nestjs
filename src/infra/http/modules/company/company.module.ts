import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../../../typeorm/entities/company.entity';
import { CreateCompany } from '../../../../application/usecases/company/create-company';
import { FindAllCompany } from '../../../../application/usecases/company/findAll-company';
import { CompanyRepository } from '../../../../domain/repositories/company.repository';
import { CompanyTypeormRepository } from '../../../typeorm/repositories/company-typeorm.repository';
import { CompanyController } from '../../controllers/company.controller';
import { FindOneCompany } from '../../../../application/usecases/company/findOne-company';
import { DeleteCompany } from '../../../../application/usecases/company/delete-company';
import { ResponsibleModule } from '../responsible/responsible.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), ResponsibleModule],
  controllers: [CompanyController],
  providers: [
    {
      provide: CompanyRepository,
      useClass: CompanyTypeormRepository,
    },
    CreateCompany,
    FindAllCompany,
    FindOneCompany,
    DeleteCompany,
  ],
})
export class CompanyModule {}
