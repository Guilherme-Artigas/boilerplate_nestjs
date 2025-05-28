import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../models/company.entity';

@Injectable()
export class DeleteCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async execute(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    // Verifica se a empresa tem produtos
    if (company.products && company.products.length > 0) {
      throw new Error('You cannot deactivate a company that has products');
    }

    // Desativa a empresa ao invés de excluí-la
    company.isAvailable = false;
    return this.companyRepository.save(company);
  }
}
