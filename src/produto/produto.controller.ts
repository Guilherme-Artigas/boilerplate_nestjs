import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Produto } from './typeorm-produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly service: ProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.', type: Produto })
  criar(@Body() dados: CreateProdutoDto) {
    return this.service.criar(dados);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos' })
  @ApiResponse({ status: 200, type: [Produto] })
  listar() {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um produto por ID' })
  @ApiResponse({ status: 200, type: Produto })
  buscar(@Param('id') id: string) {
    return this.service.buscarPorId(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um produto' })
  @ApiResponse({ status: 200, type: Produto })
  atualizar(@Param('id') id: string, @Body() dados: UpdateProdutoDto) {
    return this.service.atualizar(Number(id), dados);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um produto' })
  @ApiResponse({ status: 204 })
  remover(@Param('id') id: string) {
    return this.service.remover(Number(id));
  }
}
