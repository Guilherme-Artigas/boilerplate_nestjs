import { ILogger } from '@core/lib/logger/logger.interface';
import { ICompanyRepository } from '../../../repositories/ICompanyRepository';
import { IUseCase } from '@core/usecases/IUseCase';
import {
  UpdateCompanyInputDto,
  UpdateCompanyOutputDto,
} from '../../../types/company.types';
import { Company } from '@domain/company/enterprise/entities/Company';
import { CustomError } from '@core/errors/CustomError';
import { UniqueEntityID } from '@core/entities/UniqueEntityId';
import { Manager } from '@domain/company/enterprise/entities/Manager';
import { Email } from '@domain/company/enterprise/entities/value-object/Email.vo';
import { Document } from '@domain/company/enterprise/entities/value-object/Document.vo';
import { Inject } from '@nestjs/common';

export class UpdateCompanyUseCase implements IUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: UpdateCompanyInputDto
  ): Promise<UpdateCompanyOutputDto | undefined> {
    try {
      const company = await this.companyRepository.findOne(data.id);
      if (!company) {
        this.logger.error(
          `Company with id ${data.id} not found`,
          new CustomError('NotFound', 404)
        );
        throw new CustomError(`Company with id ${data.id} not found`, 404);
      }

      const updatedCompany = Company.create(
        {
          ...company,
          name: data.name || company.name,
          cnpj: data.cnpj || company.cnpj,
          manager:
            Manager.create(
              {
                name: data.manager.name || company.manager.name,
                email:
                  Email.create(data.manager.email) || company.manager.email,
                phone: data.manager.phone || company.manager.phone,
                cpf: Document.create(data.manager.cpf) || company.manager.cpf,
              },
              new UniqueEntityID(data.manager.id || company.id.toString())
            ) || company.manager,
        },
        new UniqueEntityID(data.id || company.id.toString())
      );

      const result = await this.companyRepository.save(updatedCompany);

      return {
        id: result.id.toString(),
        name: result.name,
        manager: result.manager,
        cnpj: result.cnpj,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
