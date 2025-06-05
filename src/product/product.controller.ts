import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() product: { name: string; price: number; companyId: number },
  ) {
    try {
      return await this.productService.create(product);
    } catch (error) {
      throw new Error('Erro ao criar produto');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar produtos');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.findOne(+id);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Produto não encontrado') {
          throw new NotFoundException(error.message);
        }
      }
      throw new InternalServerErrorException('Erro ao buscar produto');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    product: {
      name?: string;
      price?: number;
      companyId?: number;
    },
  ) {
    try {
      return await this.productService.update(+id, product);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Produto não encontrado') {
          throw new NotFoundException(error.message);
        }
      }
      throw new InternalServerErrorException('Erro ao atualizar produto');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.productService.remove(+id);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Produto não encontrado') {
          throw new NotFoundException(error.message);
        }
      }
      throw new InternalServerErrorException('Erro ao remover produto');
    }
  }
}
