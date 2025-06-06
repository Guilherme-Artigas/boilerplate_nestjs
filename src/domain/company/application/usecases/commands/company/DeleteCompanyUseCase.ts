import { IUseCase } from '@core/usecases/IUseCase';
import { ICompanyRepository } from '../../../repositories/ICompanyRepository';
import { ILogger } from '@core/lib/logger/logger.interface';
import { CustomError } from '@core/errors/CustomError';
import {
  DeleteCompanyInputDto,
  DeleteCompanyOutputDto,
} from '../../../types/company.types';
import { Inject } from '@nestjs/common';

export class DeleteCompanyUseCase implements IUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: DeleteCompanyInputDto
  ): Promise<DeleteCompanyOutputDto | undefined> {
    try {
      const company = await this.companyRepository.findOne(data.id);

      if (!company) {
        this.logger.error(
          `Company with id ${data.id} not found`,
          new CustomError('NotFound', 404)
        );
        throw new CustomError(`Company with id ${data.id} not found`, 404);
      }
      await this.companyRepository.remove(data.id);
      return {
        id: company.id.toString(),
        name: company.name,
        manager: company.manager,
        cnpj: company.cnpj,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
