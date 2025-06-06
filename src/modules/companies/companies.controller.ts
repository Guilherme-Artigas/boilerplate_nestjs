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
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { OutputCompanyDto } from './dto/output-company.dto';

@Controller('companies')
@ApiTags('Companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    @ApiOperation({
        summary: 'Create a new company',
        description: 'This endpoint creates a new company using the provided data.',
    })
    @ApiCreatedResponse({
        description: 'Company created successfully.',
        type: OutputCompanyDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companiesService.create(createCompanyDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Retrieve all companies',
        description: 'Fetches all registered companies.',
    })
    @ApiOkResponse({
        description: 'Successfully retrieved list of companies.',
        type: [OutputCompanyDto],
    })
    findAll() {
        return this.companiesService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get company details by ID',
        description: 'Retrieves the details of a specific company based on the provided ID.',
    })
    @ApiOkResponse({
        description: 'Company successfully retrieved.',
        type: OutputCompanyDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    @ApiNotFoundResponse()
    @ApiParam({ name: 'id', required: true, description: 'Company ID' })
    findOne(@Param('id') id: string) {
        return this.companiesService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update a company',
        description: 'Updates company information based on the given ID.',
    })
    @ApiOkResponse({
        description: 'Company updated successfully.',
        type: OutputCompanyDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    @ApiNotFoundResponse()
    @ApiParam({ name: 'id', required: true, description: 'Company ID' })
    update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        return this.companiesService.update(+id, updateCompanyDto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a company',
        description: 'Removes a company from the database using the provided ID.',
    })
    @ApiNoContentResponse({
        description: 'Company deleted successfully.',
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    @ApiNotFoundResponse()
    @ApiParam({ name: 'id', required: true, description: 'Company ID' })
    remove(@Param('id') id: string) {
        return this.companiesService.remove(+id);
    }
}
