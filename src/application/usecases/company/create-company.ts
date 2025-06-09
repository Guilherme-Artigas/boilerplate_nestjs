import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../../../domain/repositories/company.repository';
import { CreateCompanyDto } from '../../dtos/company/create-company.dto';
import { Company } from '../../../domain/entities/company';
import { ResponsibleRepository } from '../../../domain/repositories/responsible.repository';

@Injectable()
export class CreateCompany {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly responsibleRepository: ResponsibleRepository,
  ) {}

  async execute(dto: CreateCompanyDto): Promise<void> {
    const responsible = await this.responsibleRepository.findOne(
      dto.responsibleId,
    );
    if (!responsible) {
      throw new NotFoundException(`${responsible} não encontrado`);
    }
    const company = new Company(dto.name, responsible.id);
    return await this.companyRepository.create(company);
  }
}
