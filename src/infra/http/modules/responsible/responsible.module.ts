import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsibleEntity } from '../../../typeorm/entities/responsible.entity';
import { CreateResponsible } from '../../../../application/usecases/responsible/create-responsible';
import { FindAllResponsible } from '../../../../application/usecases/responsible/findAll-responsible';
import { ResponsibleRepository } from '../../../../domain/repositories/responsible.repository';
import { ResponsibleTypeormRepository } from '../../../typeorm/repositories/responsible-typeorm.repository';
import { ResponsibleController } from '../../controllers/responsible.controller';
import { FindOneResponsible } from '../../../../application/usecases/responsible/findOne-responsible';
import { DeleteResponsible } from '../../../../application/usecases/responsible/delete-responsible';

@Module({
  imports: [TypeOrmModule.forFeature([ResponsibleEntity])],
  controllers: [ResponsibleController],
  providers: [
    CreateResponsible,
    FindAllResponsible,
    FindOneResponsible,
    DeleteResponsible,
    {
      provide: ResponsibleRepository,
      useClass: ResponsibleTypeormRepository,
    },
  ],
  exports: [ResponsibleRepository],
})
export class ResponsibleModule {}
