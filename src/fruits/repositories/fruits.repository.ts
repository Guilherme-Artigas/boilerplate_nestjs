import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma';
import { IFruitsRepository } from './fruits.repository.interface';
import { CreateFruitDto } from '../dto/create-fruit.dto';
import { UpdateFruitDto } from '../dto/update-fruit.dto';

@Injectable()
export class FruitsRepository implements IFruitsRepository {
  private prisma = new PrismaClient();

  async create(data: CreateFruitDto) {
    return this.prisma.fruit.create({ data });
  }

  async findAll() {
    return this.prisma.fruit.findMany();
  }

  async findOne(id: string) {
    return this.prisma.fruit.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateFruitDto) {
    const exists = await this.prisma.fruit.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Fruta não encontrada');

    return this.prisma.fruit.update({ where: { id }, data });
  }

  async remove(id: string) {
    const exists = await this.prisma.fruit.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Fruta não encontrada');

    await this.prisma.fruit.delete({ where: { id } });
  }
}
