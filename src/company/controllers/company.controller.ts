import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { ListCompanyDto } from '../dto/list-company.dto';
import { CreateCompanyService } from '../services/create-company.service';
import { ListCompanyService } from '../services/list-company.service';
import { UpdateCompanyService } from '../services/update-company.service';
import { DeleteCompanyService } from '../services/delete-company.service';
import { Company } from '../../models/company.entity';
import { GetCompanyByIdService } from '../services/get-company-by-id.service';

@ApiTags('Empresas')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createCompanyService: CreateCompanyService,
    private readonly listCompanyService: ListCompanyService,
    private readonly getCompanyByIdService: GetCompanyByIdService,
    private readonly updateCompanyService: UpdateCompanyService,
    private readonly deleteCompanyService: DeleteCompanyService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova empresa' })
  @ApiResponse({ status: 201, description: 'Empresa criada com sucesso', type: Company })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Email ou documento já cadastrado' })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.createCompanyService.execute(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar empresas' })
  @ApiResponse({ status: 200, description: 'Lista de empresas retornada com sucesso' })
  async findAll(@Query() query: ListCompanyDto): Promise<{ data: Company[]; total: number }> {
    return this.listCompanyService.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar empresa por ID' })
  @ApiResponse({ status: 200, description: 'Empresa encontrada com sucesso', type: Company })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  async findOne(@Param('id') id: string): Promise<Company> {
    return this.getCompanyByIdService.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma empresa' })
  @ApiResponse({ status: 200, description: 'Empresa atualizada com sucesso', type: Company })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  @ApiResponse({ status: 409, description: 'Email ou documento já cadastrado' })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.updateCompanyService.execute(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desativar uma empresa' })
  @ApiResponse({ status: 200, description: 'Empresa desativada com sucesso', type: Company })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  @ApiResponse({ status: 400, description: 'Não é possível desativar uma empresa com produtos' })
  async remove(@Param('id') id: string): Promise<Company> {
    return this.deleteCompanyService.execute(id);
  }
}
