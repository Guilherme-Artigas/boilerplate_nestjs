import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../../../domain/repositories/company.repository';

@Injectable()
export class DeleteCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<boolean> {
    const company = await this.companyRepository.delete(id);

    if (!company) {
      throw new NotFoundException(`o id: ${id} de company não foi encontrado`);
    }
    return company;
  }
}
