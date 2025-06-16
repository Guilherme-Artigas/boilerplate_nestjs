import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { ICompaniesRepository } from './companies.repository'
import { CreateCompanyDto } from '../dtos/create-company.dto'
import { UpdateCompanyDto } from '../dtos/update-company.dto'
import { Company } from '@prisma/client'

@Injectable()
export class CompaniesRepository implements ICompaniesRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCompanyDto): Promise<Company> {
    return this.prisma.company.create({ data })
  }

  async findAll(): Promise<Company[]> {
    return this.prisma.company.findMany()
  }

  async findById(id: string): Promise<Company | null> {
    return this.prisma.company.findUnique({ where: { id } })
  }

  async findByDocument(document: string): Promise<Company | null> {
    return this.prisma.company.findUnique({ where: { document } })
  }

  async update(id: string, data: UpdateCompanyDto): Promise<Company> {
    return this.prisma.company.update({ where: { id }, data })
  }

  async remove(id: string): Promise<void> {
    await this.prisma.company.delete({ where: { id } })
  }
}
