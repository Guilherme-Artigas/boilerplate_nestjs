import { IUseCase } from '@core/usecases/IUseCase';
import { ICompanyRepository } from '../../../repositories/ICompanyRepository';
import { ILogger } from '@core/lib/logger/logger.interface';
import { GetAllCompaniesOutputDto } from '../../../types/company.types';
import { Inject } from '@nestjs/common';

export class GetCompaniesUseCase implements IUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(): Promise<GetAllCompaniesOutputDto | undefined> {
    try {
      const companies = await this.companyRepository.findAll();

      return companies.map((company) => ({
        id: company.id.toString(),
        name: company.name,
        manager: company.manager,
        cnpj: company.cnpj,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      }));
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
