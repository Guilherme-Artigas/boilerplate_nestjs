import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyUseCaseFacade } from '@domain/company/application/facade/CompanyUseCaseFacade';
import { HttpExceptionFilter } from '@shared/middlewares/http-exception.filter';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyUseCaseFacade: CompanyUseCaseFacade) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({ status: 201, description: 'Company successfully created.' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyUseCaseFacade.createUseCase().execute(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all companies' })
  @ApiResponse({ status: 200, description: 'List of companies.' })
  @UseFilters(new HttpExceptionFilter())
  findAll() {
    return this.companyUseCaseFacade.getAllUseCase().execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Company ID',
  })
  @ApiResponse({ status: 200, description: 'Company found.' })
  findOne(@Param('id') id: string) {
    return this.companyUseCaseFacade.getByIdUseCase().execute({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Company ID',
  })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({ status: 200, description: 'Company updated.' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyUseCaseFacade
      .updateUseCase()
      .execute({ id, ...updateCompanyDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Company ID',
  })
  @ApiResponse({ status: 200, description: 'Company deleted.' })
  remove(@Param('id') id: string) {
    return this.companyUseCaseFacade.deleteUseCase().execute({ id });
  }
}
