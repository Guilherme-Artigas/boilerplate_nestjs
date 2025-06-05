import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: { name: string; cnpj: string }) {
    try {
      return await this.companyService.create(createCompanyDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.companyService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new InternalServerErrorException('Erro ao buscar empresas');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.companyService.findOne(+id);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Empresa não encontrada') {
          throw new NotFoundException(error.message);
        }
      }
      throw new InternalServerErrorException('Erro ao buscar empresa');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: { name?: string; cnpj?: string },
  ) {
    try {
      return await this.companyService.update(+id, updateCompanyDto);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          if (error.message === 'Empresa não encontrada') {
            throw new NotFoundException(error.message);
          }
          if (error.message === 'Empresa já existente') {
            throw new ForbiddenException(error.message);
          }
        }
      }
      throw new InternalServerErrorException('Erro ao atualizar empresa');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.companyService.remove(+id);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Empresa não encontrada') {
          throw new NotFoundException(error.message);
        }
      }
      throw new InternalServerErrorException('Erro ao remover empresa');
    }
  }
}
