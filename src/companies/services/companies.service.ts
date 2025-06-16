import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'
import { ICompaniesRepository } from '../repositories/companies.repository'
import { CreateCompanyDto } from '../dtos/create-company.dto'
import { UpdateCompanyDto } from '../dtos/update-company.dto'
import { Company } from '../entities/company.entity'

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: ICompaniesRepository) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const existingCompany = await this.companiesRepository.findByDocument(
      createCompanyDto.document,
    )
    if (existingCompany) {
      throw new ConflictException('Company with this document already exists')
    }
    return this.companiesRepository.create(createCompanyDto)
  }

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.findAll()
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companiesRepository.findById(id)
    if (!company) {
      throw new NotFoundException(`Company with ID "${id}" not found`)
    }
    return company
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const existingCompany = await this.companiesRepository.findById(id)
    if (!existingCompany) {
      throw new NotFoundException(`Company with ID "${id}" not found`)
    }
    if (
      updateCompanyDto.document &&
      updateCompanyDto.document !== existingCompany.document
    ) {
      const companyWithSameDocument =
        await this.companiesRepository.findByDocument(updateCompanyDto.document)
      if (companyWithSameDocument && companyWithSameDocument.id !== id) {
        throw new ConflictException(
          'Another company with this document already exists',
        )
      }
    }
    return this.companiesRepository.update(id, updateCompanyDto)
  }

  async remove(id: string): Promise<void> {
    const existingCompany = await this.companiesRepository.findById(id)
    if (!existingCompany) {
      throw new NotFoundException(`Company with ID "${id}" not found`)
    }
    await this.companiesRepository.remove(id)
  }
}
