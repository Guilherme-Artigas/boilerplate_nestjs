import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUsersRepository } from '../repositories/users.repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userWithHashedPassword = { ...data, password: hashedPassword };
    return this.usersRepository.create(userWithHashedPassword);
  }

  findAll() {
    return this.usersRepository.findAll({ include: { fruits: true } });
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id, { include: { fruits: true } });
  }
  async update(id: string, data: UpdateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userWithHashedPassword = { ...data, password: hashedPassword };
    return this.usersRepository.update(id, userWithHashedPassword)
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
