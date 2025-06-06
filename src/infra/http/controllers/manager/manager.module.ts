import { Module } from '@nestjs/common';
import { ManagerRepository } from '@infra/database/prisma/repositories/manager.repository';
import { CompanyRepository } from '@infra/database/prisma/repositories/company.repository';
import { DatabaseModule } from '@infra/database/database.module';
import { LoggerModule } from '@shared/logger/logger.module';
import { CreateManagerUseCase } from '@domain/company/application/usecases/commands/manager/CreateManagerUseCase';
import { UpdateManagerUseCase } from '@domain/company/application/usecases/commands/manager/UpdateManagerUseCase';
import { DeleteManagerUseCase } from '@domain/company/application/usecases/commands/manager/DeleteManagerUseCase';
import { ManagerUseCaseFacade } from '@domain/company/application/facade/ManagerUseCaseFacade';
import { GetManagerByIdUseCase } from '@domain/company/application/usecases/queries/manager/GetManagersByIdUseCase';
import { GetManagersUseCase } from '@domain/company/application/usecases/queries/manager/GetManagersUseCase';
import { ManagerController } from './manager.controller';

const usecases = [
  CreateManagerUseCase,
  UpdateManagerUseCase,
  DeleteManagerUseCase,
  GetManagerByIdUseCase,
  GetManagersUseCase,
];

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [ManagerController],
  providers: [
    ...usecases,
    ManagerUseCaseFacade,
    {
      provide: 'IManagerRepository',
      useClass: ManagerRepository,
    },
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
  exports: [...usecases, ManagerUseCaseFacade],
})
export class ManagerModule {}
