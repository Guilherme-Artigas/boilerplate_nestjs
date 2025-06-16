import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { CompaniesService } from '../services/companies.service'
import { CreateCompanyDto } from '../dtos/create-company.dto'
import { UpdateCompanyDto } from '../dtos/update-company.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates a new company' })
  @ApiResponse({ status: 201, description: 'Company successfully created.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Company with the same tax ID already exists.',
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto)
  }

  @Get()
  @ApiOperation({ summary: 'Returns all companies' })
  @ApiResponse({
    status: 200,
    description: 'List of companies retrieved successfully.',
  })
  findAll() {
    return this.companiesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a company by ID' })
  @ApiResponse({ status: 200, description: 'Company retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an existing company' })
  @ApiResponse({ status: 200, description: 'Company updated successfully.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Company with the same tax ID already exists.',
  })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Removes a company' })
  @ApiResponse({ status: 204, description: 'Company successfully removed.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id)
  }
}
