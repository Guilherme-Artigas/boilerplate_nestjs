import {
    ApiOperation,
    ApiTags,
    ApiParam,
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { OutputProductDto } from './dto/output-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsQueryPaginateDto } from './dto/products-query-paginate.dto';
import { ProductsOutputPaginateDto } from './dto/products-output-paginate.dto';

@Controller('companies/:companyId/products')
@ApiTags('Products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @ApiOperation({
        summary: 'Create a new product for a company',
        description: 'Creates a new product and associates it with a specific company.',
    })
    @ApiCreatedResponse({
        description: 'Product created successfully.',
        type: OutputProductDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    @ApiParam({ name: 'companyId', required: true, description: 'Company ID' })
    create(@Param('companyId') companyId: string, @Body() createProductDto: CreateProductDto) {
        return this.productsService.create(companyId, createProductDto);
    }

    @Get('paginate')
    @ApiOperation({
        summary: 'Retrieve paginated products of a company',
        description: 'Fetches products for a given company with optional pagination and search query.',
    })
    @ApiOkResponse({
        description: 'Successfully retrieved paginated list of products.',
        type: ProductsOutputPaginateDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid query parameters. Please verify the input.',
    })
    @ApiParam({ name: 'companyId', required: true, description: 'Company ID' })
    async paginate(@Param('companyId') companyId: string, @Query() dto: ProductsQueryPaginateDto): Promise<ProductsOutputPaginateDto> {
        return await this.productsService.paginate(companyId, dto);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get product details by ID for a company',
        description: 'Retrieves product details for a given company and product ID.',
    })
    @ApiOkResponse({
        description: 'Product successfully recovered.',
        type: OutputProductDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    @ApiNotFoundResponse()
    @ApiParam({ name: 'companyId', required: true, description: 'Company ID' })
    @ApiParam({ name: 'id', required: true, description: 'Product ID' })
    findOne(@Param('companyId') companyId: string, @Param('id') id: string) {
        return this.productsService.findOne(companyId, +id);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update a product for a company',
        description: 'Updates product information for a given company and product ID.',
    })
    @ApiOkResponse({
        description: 'Product updated successfully.',
        type: OutputProductDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    @ApiNotFoundResponse()
    @ApiParam({ name: 'companyId', required: true, description: 'Company ID' })
    @ApiParam({ name: 'id', required: true, description: 'Product ID' })
    update(@Param('companyId') companyId: string, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(companyId, +id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a product from a company',
        description: 'Removes a product from a given company using the provided ID.',
    })
    @ApiNoContentResponse({
        description: 'Product deleted successfully.',
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    @ApiNotFoundResponse()
    @ApiParam({ name: 'companyId', required: true, description: 'Company ID' })
    @ApiParam({ name: 'id', required: true, description: 'Product ID' })
    remove(@Param('companyId') companyId: string, @Param('id') id: string) {
        return this.productsService.remove(companyId, +id);
    }
}
