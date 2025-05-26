import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ListProductsDto } from '../dto/list-products.dto';
import { CreateProductService } from '../services/create-product.service';
import { ListProductsService } from '../services/list-products.service';
import { UpdateProductService } from '../services/update-product.service';
import { DeleteProductsService } from '../services/delete-products.service';
import { Products } from '../../models/products.entity';

@ApiTags('Produtos')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly listProductsService: ListProductsService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso', type: Products })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Products> {
    return this.createProductService.execute(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar produtos' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso' })
  async findAll(@Query() query: ListProductsDto): Promise<{ data: Products[]; total: number }> {
    return this.listProductsService.execute(query);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso', type: Products })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    return this.updateProductService.execute(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desativar um produto' })
  @ApiResponse({ status: 200, description: 'Produto desativado com sucesso', type: Products })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async remove(@Param('id') id: string): Promise<Products> {
    return this.deleteProductService.execute(id);
  }
}
