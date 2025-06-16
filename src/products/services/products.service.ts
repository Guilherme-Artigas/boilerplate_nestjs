import { Injectable, NotFoundException } from '@nestjs/common'
import { IProductsRepository } from '../repositories/products.repository'
import { CreateProductDto } from '../dtos/create-product.dto'
import { UpdateProductDto } from '../dtos/update-product.dto'
import { Product } from '../entities/product.entity'
import { ICompaniesRepository } from '../../companies/repositories/companies.repository'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: IProductsRepository,
    private readonly companiesRepository: ICompaniesRepository,
  ) {}

  private async validateCompany(companyId: string): Promise<void> {
    const company = await this.companiesRepository.findById(companyId)
    if (!company) {
      throw new NotFoundException(`Company with ID "${companyId}" not found`)
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.validateCompany(createProductDto.companyId)
    return this.productRepository.create(createProductDto)
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll()
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`)
    }
    return product
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id)
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`)
    }

    if (updateProductDto.companyId) {
      await this.validateCompany(updateProductDto.companyId)
    }

    return this.productRepository.update(id, updateProductDto)
  }

  async remove(id: string): Promise<void> {
    const existingProduct = await this.productRepository.findById(id)
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`)
    }
    await this.productRepository.remove(id)
  }
}
