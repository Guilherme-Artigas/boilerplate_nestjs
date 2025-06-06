import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductUseCaseFacade } from '@domain/company/subdomain/product/application/facade/ProductUseCaseFacade';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productUseCaseFacade: ProductUseCaseFacade) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productUseCaseFacade.createUseCase().execute(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'List of products.' })
  findAll() {
    return this.productUseCaseFacade.getAllUseCase().execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Product found.' })
  findOne(@Param('id') id: string) {
    return this.productUseCaseFacade.getByIdUseCase().execute({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productUseCaseFacade
      .updateUseCase()
      .execute({ ...updateProductDto, id });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Product deleted.' })
  remove(@Param('id') id: string) {
    return this.productUseCaseFacade.deleteUseCase().execute({ id });
  }
}
