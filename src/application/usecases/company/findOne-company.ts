import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../../../domain/repositories/company.repository';
import { Company } from '../../../domain/entities/company';

@Injectable()
export class FindOneCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<Company | null> {
    const company = await this.companyRepository.findOne(id);

    if (!company) {
      throw new NotFoundException(`o id: ${id} de company não foi encontrado`);
    }
    return company;
  }
}
