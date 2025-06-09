import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../../domain/repositories/company.repository';
import { CompanyResponseDto } from '../../dtos/company/company-response.dto';

@Injectable()
export class FindAllCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<CompanyResponseDto[]> {
    const companies = await this.companyRepository.findAll();
    return companies.map((company) => CompanyResponseDto.fromDomain(company));
  }
}
