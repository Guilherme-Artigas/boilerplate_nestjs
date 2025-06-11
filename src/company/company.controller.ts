import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 409, description: 'CNPJ already exists' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Returns all companies' })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({ status: 200, description: 'Returns the company' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({ status: 200, description: 'Company updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiResponse({ status: 409, description: 'CNPJ already exists' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.remove(id);
  }
}
