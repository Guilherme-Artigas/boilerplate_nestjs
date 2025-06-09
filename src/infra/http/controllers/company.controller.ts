import { CompanyResponseDto } from '../../../application/dtos/company/company-response.dto';
import { CreateCompanyDto } from '../../../application/dtos/company/create-company.dto';
import { CreateCompany } from '../../../application/usecases/company/create-company';
import { DeleteCompany } from '../../../application/usecases/company/delete-company';
import { FindAllCompany } from '../../../application/usecases/company/findAll-company';
import { FindOneCompany } from '../../../application/usecases/company/findOne-company';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createCompany: CreateCompany,
    private readonly findOneCompany: FindOneCompany,
    private readonly findAllCompany: FindAllCompany,
    private readonly deleteCompany: DeleteCompany,
  ) {}

  @Post()
  async create(@Body() dto: CreateCompanyDto): Promise<void> {
    await this.createCompany.execute(dto);
  }

  @Get()
  async findAll(): Promise<CompanyResponseDto[]> {
    const companies = await this.findAllCompany.execute();
    return companies.map((company) => CompanyResponseDto.fromDomain(company));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyResponseDto> {
    const company = await this.findOneCompany.execute(id);
    return CompanyResponseDto.fromDomain(company);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.deleteCompany.execute(id);
    return { success };
  }
}
