import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from '../../../domain/repositories/company.repository';
import { Company } from '../../../domain/entities/company';

@Injectable()
export class CompanyTypeormRepository implements CompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyOrmRepository: Repository<CompanyEntity>,
  ) {}
  async findAll(): Promise<Company[]> {
    const companies = await this.companyOrmRepository.find();
    return companies.map((company) => this.toDomain(company));
  }
  async create(company: Company): Promise<void> {
    await this.companyOrmRepository.save(this.toOrm(company));
  }
  async findOne(id: string): Promise<Company | null> {
    const company = await this.companyOrmRepository.findOne({
      where: { id },
      relations: ['responsible'],
    });
    if (!company) {
      return null;
    }
    return this.toDomain(company);
  }
  async delete(id: string): Promise<boolean> {
    const company = await this.companyOrmRepository.delete(id);
    return company.affected !== 0;
  }

  private toOrm(domain: Company): CompanyEntity {
    return {
      id: domain.id,
      name: domain.name,
      responsible: domain.responsible,
    };
  }

  private toDomain(entity: CompanyEntity): Company {
    return new Company(entity.id, entity.name, entity.responsible);
  }
}
