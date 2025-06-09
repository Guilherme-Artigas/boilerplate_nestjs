import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CompanyEntity } from '../../../typeorm/entities/company.entity';
import { ProductEntity } from '../../../typeorm/entities/product.entity';
import { ResponsibleEntity } from '../../../typeorm/entities/responsible.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [CompanyEntity, ProductEntity, ResponsibleEntity],
  synchronize: true,
};
