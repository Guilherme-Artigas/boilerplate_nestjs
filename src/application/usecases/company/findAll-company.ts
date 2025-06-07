import { Injectable } from '@nestjs/common';
import { Company } from '../../../domain/entities/company';
import { CompanyRepository } from '../../../domain/repositories/company.repository';

@Injectable()
export class FindAllCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<Company[]> {
    return await this.companyRepository.findAll();
  }
}
