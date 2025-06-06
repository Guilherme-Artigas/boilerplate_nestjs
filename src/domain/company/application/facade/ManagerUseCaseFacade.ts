import { Injectable } from '@nestjs/common';
import { CreateManagerUseCase } from '../usecases/commands/manager/CreateManagerUseCase';
import { UpdateManagerUseCase } from '../usecases/commands/manager/UpdateManagerUseCase';
import { IUseCaseFacade } from '@core/facade/IUseCaseFacade';
import { DeleteManagerUseCase } from '../usecases/commands/manager/DeleteManagerUseCase';
import { GetManagerByIdUseCase } from '../usecases/queries/manager/GetManagersByIdUseCase';
import { GetManagersUseCase } from '../usecases/queries/manager/GetManagersUseCase';

@Injectable()
export class ManagerUseCaseFacade
  implements
    IUseCaseFacade<
      CreateManagerUseCase,
      UpdateManagerUseCase,
      DeleteManagerUseCase,
      GetManagerByIdUseCase,
      GetManagersUseCase
    >
{
  constructor(
    private readonly createManagerUseCase: CreateManagerUseCase,
    private readonly updateManagerUseCase: UpdateManagerUseCase,
    private readonly deleteManagerUseCase: DeleteManagerUseCase,
    private readonly findManagerByIdUseCase: GetManagerByIdUseCase,
    private readonly getCompaniesUseCase: GetManagersUseCase
  ) {}

  createUseCase() {
    return this.createManagerUseCase;
  }

  updateUseCase() {
    return this.updateManagerUseCase;
  }

  deleteUseCase() {
    return this.deleteManagerUseCase;
  }

  getByIdUseCase() {
    return this.findManagerByIdUseCase;
  }

  getAllUseCase() {
    return this.getCompaniesUseCase;
  }
}
