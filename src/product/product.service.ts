import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductService {
  async findAll() {
    try {
      return await prisma.product.findMany();
    } catch (err) {
      throw new Error('Erro ao buscar produtos');
    }
  }

  async findOne(id: number) {
    try {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      return product;
    } catch (err) {
      throw new Error('Erro ao buscar produto');
    }
  }

  async create(data: { name: string; price: number; companyId: number }) {
    try {
      return await prisma.product.create({ data });
    } catch (err) {
      throw new Error('Erro ao criar produto');
    }
  }

  async update(
    id: number,
    data: { name?: string; price?: number; companyId?: number },
  ) {
    try {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      return await prisma.product.update({ where: { id }, data });
    } catch (err) {
      throw new Error('Erro ao atualizar produto');
    }
  }

  async remove(id: number) {
    try {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      return await prisma.product.delete({ where: { id } });
    } catch (err) {
      throw new Error('Erro ao remover produto');
    }
  }
}

