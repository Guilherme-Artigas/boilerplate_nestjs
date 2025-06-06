import { IProductRepository } from '@domain/company/subdomain/product/application/repositories/IProductRepository';
import { Product } from '@domain/company/subdomain/product/enterprise/entities/Product';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaProductMapper } from './mappers/prisma-product.mapper';
import { CustomError } from '@core/errors/CustomError';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Product): Promise<Product> {
    try {
      const product = PrismaProductMapper.toPrisma(data);

      await this.prisma.product.create({ data: product });
      return data;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async save(data: Product): Promise<Product> {
    try {
      const product = PrismaProductMapper.toPrisma(data);
      await this.prisma.product.update({
        where: { id: product.id },
        data: product,
      });

      return data;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
  async findAll(): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          company: {
            select: {
              id: true,
              name: true,
              manager: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      return products.map((product) => PrismaProductMapper.toDomain(product));
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              manager: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
      if (!product) {
        throw new CustomError('Product not found', 404);
      }
      return PrismaProductMapper.toDomain(product);
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
