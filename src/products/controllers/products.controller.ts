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
import { ProductsService } from '../services/products.service'
import { CreateProductDto } from '../dtos/create-product.dto'
import { UpdateProductDto } from '../dtos/update-product.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Product with the same name already exists.',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get()
  @ApiOperation({ summary: 'Returns all products' })
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved successfully.',
  })
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an existing product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Product with the same name already exists.',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Removes a product' })
  @ApiResponse({ status: 204, description: 'Product successfully removed.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}
