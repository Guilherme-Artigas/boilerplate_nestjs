import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../../domain/repositories/company.repository';
import { Company } from '../../../domain/entities/company';

@Injectable()
export class CreateCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(company: Company): Promise<void> {
    return await this.companyRepository.create(company);
  }
}
