import { CreateFruitDto } from '../dto/create-fruit.dto';
import { UpdateFruitDto } from '../dto/update-fruit.dto';
import { Fruit } from '../../../generated/prisma';

export abstract class IFruitsRepository {
  abstract create(data: CreateFruitDto): Promise<Fruit>;
  abstract findAll(): Promise<Fruit[]>;
  abstract findOne(id: string): Promise<Fruit | null>;
  abstract update(id: string, data: UpdateFruitDto): Promise<Fruit>;
  abstract remove(id: string): Promise<void>;
}
