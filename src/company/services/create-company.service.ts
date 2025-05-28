import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../models/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';

@Injectable()
export class CreateCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async execute(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const existingCompany = await this.companyRepository.findOne({
      where: [{ email: createCompanyDto.email }, { document: createCompanyDto.document }],
    });

    if (existingCompany) {
      if (existingCompany.email === createCompanyDto.email) {
        throw new ConflictException('Email already registered');
      }
      if (existingCompany.document === createCompanyDto.document) {
        throw new ConflictException('Document already registered');
      }
    }

    const company = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }
}
