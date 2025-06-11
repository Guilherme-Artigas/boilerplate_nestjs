import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      // Check if company exists
      const company = await this.prisma.company.findUnique({
        where: { id: createProductDto.companyId },
      });

      if (!company) {
        throw new BadRequestException(
          `Company with ID ${createProductDto.companyId} not found`,
        );
      }

      return await this.prisma.product.create({
        data: createProductDto,
        include: {
          company: true,
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error creating product: ' + error.message);
    }
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        company: true,
      },
    });
  }

  async findByCompany(companyId: number) {
    // Check if company exists
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    return await this.prisma.product.findMany({
      where: { companyId },
      include: {
        company: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
        include: {
          company: true,
        },
      });
      return product;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
      return { message: `Product with ID ${id} was deleted successfully` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }
}
