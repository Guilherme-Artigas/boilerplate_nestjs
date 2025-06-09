import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsibleEntity } from '../../../typeorm/entities/responsible.entity';
import { CreateResponsible } from '../../../../application/usecases/responsible/create-responsible';
import { FindAllResponsible } from '../../../../application/usecases/responsible/findAll-responsible';
import { ResponsibleRepository } from '../../../../domain/repositories/responsible.repository';
import { ResponsibleTypeormRepository } from '../../../typeorm/repositories/responsible-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ResponsibleEntity])],
  controllers: [],
  providers: [
    CreateResponsible,
    FindAllResponsible,
    {
      provide: ResponsibleRepository,
      useClass: ResponsibleTypeormRepository,
    },
  ],
})
export class ResponsibleModule {}
