import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../models/company.entity';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class UpdateCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async execute(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!company) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }

    // Verifica se o novo email ou documento já existe em outra empresa
    if (updateCompanyDto.email || updateCompanyDto.document) {
      const existingCompany = await this.companyRepository.findOne({
        where: [{ email: updateCompanyDto.email }, { document: updateCompanyDto.document }],
      });

      if (existingCompany && existingCompany.id !== id) {
        if (existingCompany.email === updateCompanyDto.email) {
          throw new ConflictException('Email já cadastrado em outra empresa');
        }
        if (existingCompany.document === updateCompanyDto.document) {
          throw new ConflictException('Documento já cadastrado em outra empresa');
        }
      }
    }

    Object.assign(company, updateCompanyDto);
    return this.companyRepository.save(company);
  }
}
