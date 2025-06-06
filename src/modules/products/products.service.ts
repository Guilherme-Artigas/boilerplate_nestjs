import { CreateProductDto } from './dto/create-product.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { PRODUCT_REPOSITORY } from '@common/constants/repository.tokens';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsQueryPaginateDto } from './dto/products-query-paginate.dto';
import { ProductsOutputPaginateDto } from './dto/products-output-paginate.dto';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private productRepository: Repository<Product>,
        private readonly companiesService: CompaniesService,
    ) {}

    async create(companyId: string, createProductDto: CreateProductDto): Promise<Product> {
        const company = await this.companiesService.findOne(+companyId);
        const product = this.productRepository.create({ ...createProductDto, company });
        return await this.productRepository.save(product);
    }

    async findOne(companyId: string, id: number): Promise<Product> {
        await this.companiesService.findOne(+companyId);
        const product = await this.productRepository.findOne({
            where: {
                id,
                company: { id: +companyId },
            },
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found in Company ID ${companyId}`);
        }
        return product;
    }

    async paginate(companyId: string, queryDto: ProductsQueryPaginateDto): Promise<ProductsOutputPaginateDto> {
        const { pagination, page, limit, search } = queryDto;

        await this.companiesService.findOne(+companyId);

        const queryBuilder = this.productRepository.createQueryBuilder('product').where('product.companyId = :companyId', { companyId: +companyId }); // Filtro pela empresa

        if (search) {
            queryBuilder.andWhere('product.name LIKE :search OR product.description LIKE :search', { search: `%${search}%` });
        }

        if (pagination) {
            queryBuilder.take(limit).skip((page - 1) * limit);
        }

        const [data, totalDocs] = await queryBuilder.getManyAndCount();
        const totalPages = Math.ceil(totalDocs / limit);

        return {
            data,
            totalDocs,
            totalPages,
            pagingCounter: page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page,
            limit,
        };
    }

    async update(companyId: string, id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        await this.companiesService.findOne(+companyId);

        const product = await this.productRepository.findOne({ where: { id, company: { id: +companyId } } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found in Company ID ${companyId}`);
        }

        await this.productRepository.update(id, updateProductDto);

        const updatedProduct = await this.productRepository.findOne({ where: { id, company: { id: +companyId } } });
        if (!updatedProduct) {
            throw new NotFoundException(`Updated product with ID ${id} not found in Company ID ${companyId}`);
        }

        return updatedProduct;
    }

    async remove(companyId: string, id: number): Promise<void> {
        await this.companiesService.findOne(+companyId);
        const product = await this.productRepository.findOne({ where: { id, company: { id: +companyId } } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found in Company ID ${companyId}`);
        }
        await this.productRepository.delete(id);
    }
}
