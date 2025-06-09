import { CreateProductDto } from '../../../application/dtos/create-product.dto';
import { ProductResponseDto } from '../../../application/dtos/product-response.dto';
import { DeleteProduct } from '../../../application/usecases/product/delete-product';
import { FindAllProducts } from '../../../application/usecases/product/findAll-product';
import { FindOneProducts } from '../../../application/usecases/product/findOne-products';
import { CreateProduct } from './../../../application/usecases/product/create-product';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly findOneProduct: FindOneProducts,
    private readonly findAllProduct: FindAllProducts,
    private readonly deleteProduct: DeleteProduct,
  ) {}

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<void> {
    await this.createProduct.execute(dto);
  }

  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.findAllProduct.execute();
    return products.map((product) => ProductResponseDto.fromDomain(product));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    const product = await this.findOneProduct.execute(id);
    return ProductResponseDto.fromDomain(product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.deleteProduct.execute(id);
    return { success };
  }
}
