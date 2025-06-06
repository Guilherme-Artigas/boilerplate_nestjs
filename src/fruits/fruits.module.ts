import { Module } from '@nestjs/common';
import { FruitsController } from './controllers/fruits.controller';
import { FruitsService } from './services/fruits.service';
import { FruitsRepository } from './repositories/fruits.repository';
import { IFruitsRepository } from './repositories/fruits.repository.interface';

@Module({
  controllers: [FruitsController],
  providers: [
    FruitsService,
    {
      provide: IFruitsRepository,
      useClass: FruitsRepository,
    },
  ],
})
export class FruitsModule {}
