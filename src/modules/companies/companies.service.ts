import { Company } from './entities/company.entity';
import { COMPANY_REPOSITORY } from '@common/constants/repository.tokens';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
    constructor(
        @Inject(COMPANY_REPOSITORY)
        private companyRepository: Repository<Company>,
    ) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const company = this.companyRepository.create(createCompanyDto);
        return await this.companyRepository.save(company);
    }

    async findAll(): Promise<Company[]> {
        return await this.companyRepository.find();
    }

    async findOne(id: number): Promise<Company> {
        const company = await this.companyRepository.findOne({ where: { id } });
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }
        return company;
    }

    async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
        const updateResult = await this.companyRepository.update(id, updateCompanyDto);
        if (updateResult.affected === 0) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }
        const updatedCompany = await this.companyRepository.findOne({ where: { id } });
        if (!updatedCompany) {
            throw new NotFoundException(`Updated company with ID ${id} not found`);
        }
        return updatedCompany;
    }

    async remove(id: number): Promise<void> {
        const deleteResult = await this.companyRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }
    }
}
