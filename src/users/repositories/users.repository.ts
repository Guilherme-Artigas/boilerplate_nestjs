import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  private prisma = new PrismaClient();

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findAll(params?: { include?: { fruits?: boolean } }) {
    return this.prisma.user.findMany({
      include: params?.include,
    });
  }

  async findOne(id: string, params?: { include?: { fruits?: boolean } }) {
    return this.prisma.user.findUnique({
      where: { id },
      include: params?.include,
    });
  }
  async update(id: string, data: UpdateUserDto) {
    const exists = await this.prisma.user.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Usuário não encontrado');

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.user.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Usuário não encontrado');

    await this.prisma.user.delete({ where: { id } });
  }
}
