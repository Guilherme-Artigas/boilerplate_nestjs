import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CreateCompanyUseCase } from '@domain/company/application/usecases/commands/company/CreateCompanyUseCase';
import { DeleteCompanyUseCase } from '@domain/company/application/usecases/commands/company/DeleteCompanyUseCase';
import { UpdateCompanyUseCase } from '@domain/company/application/usecases/commands/company/UpdateCompanyUseCase';
import { GetCompaniesUseCase } from '@domain/company/application/usecases/queries/company/GetCompaniesUseCase';
import { GetCompanyByIdUseCase } from '@domain/company/application/usecases/queries/company/GetCompanyByIdUseCase';
import { CompanyUseCaseFacade } from '@domain/company/application/facade/CompanyUseCaseFacade';
import { LoggerModule } from '@shared/logger/logger.module';
import { DatabaseModule } from '@infra/database/database.module';
import { CompanyRepository } from '@infra/database/prisma/repositories/company.repository';
import { ManagerRepository } from '@infra/database/prisma/repositories/manager.repository';

const usecases = [
  CreateCompanyUseCase,
  UpdateCompanyUseCase,
  DeleteCompanyUseCase,
  GetCompanyByIdUseCase,
  GetCompaniesUseCase,
];

@Module({
  imports: [LoggerModule, DatabaseModule],
  controllers: [CompanyController],
  providers: [
    ...usecases,
    CompanyUseCaseFacade,
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
    {
      provide: 'IManagerRepository',
      useClass: ManagerRepository,
    },
  ],
  exports: [...usecases, CompanyUseCaseFacade],
})
export class CompanyModule {}
