import { Injectable } from '@nestjs/common';
import { CreateCompanyUseCase } from '../usecases/commands/company/CreateCompanyUseCase';
import { UpdateCompanyUseCase } from '../usecases/commands/company/UpdateCompanyUseCase';
import { GetCompanyByIdUseCase } from '../usecases/queries/company/GetCompanyByIdUseCase';
import { DeleteCompanyUseCase } from '../usecases/commands/company/DeleteCompanyUseCase';
import { GetCompaniesUseCase } from '../usecases/queries/company/GetCompaniesUseCase';
import { IUseCaseFacade } from '@core/facade/IUseCaseFacade';

@Injectable()
export class CompanyUseCaseFacade
  implements
    IUseCaseFacade<
      CreateCompanyUseCase,
      UpdateCompanyUseCase,
      DeleteCompanyUseCase,
      GetCompanyByIdUseCase,
      GetCompaniesUseCase
    >
{
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    private readonly findCompanyByIdUseCase: GetCompanyByIdUseCase,
    private readonly getCompaniesUseCase: GetCompaniesUseCase
  ) {}

  createUseCase() {
    return this.createCompanyUseCase;
  }

  updateUseCase() {
    return this.updateCompanyUseCase;
  }

  deleteUseCase() {
    return this.deleteCompanyUseCase;
  }

  getByIdUseCase() {
    return this.findCompanyByIdUseCase;
  }

  getAllUseCase() {
    return this.getCompaniesUseCase;
  }
}
