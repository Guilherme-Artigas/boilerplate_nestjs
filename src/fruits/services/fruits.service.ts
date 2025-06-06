import { Injectable } from '@nestjs/common';
import { IFruitsRepository } from '../repositories/fruits.repository.interface';
import { CreateFruitDto } from '../dto/create-fruit.dto';
import { UpdateFruitDto } from '../dto/update-fruit.dto';

@Injectable()
export class FruitsService {
  constructor(private readonly fruitsRepository: IFruitsRepository) {}

  create(data: CreateFruitDto) {
    return this.fruitsRepository.create(data);
  }

  findAll() {
    return this.fruitsRepository.findAll();
  }

  findOne(id: string) {
    return this.fruitsRepository.findOne(id);
  }

  update(id: string, data: UpdateFruitDto) {
    return this.fruitsRepository.update(id, data);
  }

  remove(id: string) {
    return this.fruitsRepository.remove(id);
  }
}
