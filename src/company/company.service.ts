import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({
        data: createCompanyDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('CNPJ already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.company.findMany({
      include: {
        products: true,
      },
    });
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const company = await this.prisma.company.update({
        where: { id },
        data: updateCompanyDto,
      });
      return company;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('CNPJ already exists');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.company.delete({
        where: { id },
      });
      return { message: `Company with ID ${id} was deleted successfully` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }
      throw error;
    }
  }
}
