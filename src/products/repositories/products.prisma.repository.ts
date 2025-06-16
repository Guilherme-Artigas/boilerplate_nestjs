import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { IProductsRepository } from './products.repository'
import { CreateProductDto } from '../dtos/create-product.dto'
import { UpdateProductDto } from '../dtos/update-product.dto'
import { Product } from '../entities/product.entity'

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data })
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        company: true,
      },
    })
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } })
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data })
  }

  async remove(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } })
  }
}
