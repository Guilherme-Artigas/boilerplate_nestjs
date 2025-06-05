import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Empresa } from './empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@ApiTags('empresas')
@Controller('empresas')
export class EmpresaController {
  constructor(private readonly service: EmpresaService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova empresa' })
  @ApiResponse({ status: 201, description: 'Empresa criada com sucesso.', type: Empresa })
  criar(@Body() dados: CreateEmpresaDto) {
    return this.service.criar(dados);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as empresas' })
  @ApiResponse({ status: 200, type: [Empresa] })
  listar() {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma empresa por ID' })
  @ApiResponse({ status: 200, type: Empresa })
  buscar(@Param('id') id: string) {
    return this.service.buscarPorId(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de uma empresa' })
  @ApiResponse({ status: 200, type: Empresa })
  atualizar(@Param('id') id: string, @Body() dados: UpdateEmpresaDto) {
    return this.service.atualizar(Number(id), dados);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma empresa' })
  @ApiResponse({ status: 204 })
  remover(@Param('id') id: string) {
    return this.service.remover(Number(id));
  }
}
