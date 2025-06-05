import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CompanyService {
  async findAll() {
    return await prisma.company.findMany();
  }

  async findOne(id: number) {
    return await prisma.company.findUnique({ where: { id } });
  }

  async create(data: { name: string; cnpj: string }) {
    const company = await prisma.company.findUnique({
      where: {
        cnpj: data.cnpj,
      },
    });

    if (company) {
      throw new Error('Empresa já existente');
    }

    try {
      return await prisma.company.create({ data });
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: number, data: { name?: string; cnpj?: string }) {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!company) {
      throw new Error('Empresa não encontrada');
    }

    const findCompanyByCnpj = await prisma.company.findUnique({
      where: {
        cnpj: data.cnpj,
      },
    });

    if (findCompanyByCnpj) {
      throw new Error('Empresa já existente');
    }

    try {
      return await prisma.company.update({ where: { id }, data });
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    const company = await prisma.company.findUnique({ where: { id } });

    if (!company) {
      throw new Error('Empresa não encontrada');
    }
    try {
      return await prisma.company.delete({ where: { id } });
    } catch (err) {
      throw new Error(err);
    }
  }
}
