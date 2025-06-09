import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../../../domain/repositories/company.repository';
import { CompanyResponseDto } from '../../dtos/company/company-response.dto';

@Injectable()
export class FindOneCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<CompanyResponseDto> {
    const company = await this.companyRepository.findOne(id);

    if (!company) {
      throw new NotFoundException(`o id: ${id} de company não foi encontrado`);
    }
    return CompanyResponseDto.fromDomain(company);
  }
}
