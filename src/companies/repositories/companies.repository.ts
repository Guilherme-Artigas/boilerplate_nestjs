import { Company } from '../entities/company.entity'
import { CreateCompanyDto } from '../dtos/create-company.dto'
import { UpdateCompanyDto } from '../dtos/update-company.dto'

export abstract class ICompaniesRepository {
  abstract create(data: CreateCompanyDto): Promise<Company>
  abstract findAll(): Promise<Company[]>
  abstract findById(id: string): Promise<Company | null>
  abstract findByDocument(document: string): Promise<Company | null>
  abstract update(id: string, data: UpdateCompanyDto): Promise<Company>
  abstract remove(id: string): Promise<void>
}
