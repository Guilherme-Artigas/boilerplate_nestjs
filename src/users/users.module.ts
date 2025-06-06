import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories/users.repository';
import { IUsersRepository } from './repositories/users.repository.interface';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository, // <- seu repositório concreto
    },
  ],
  exports: [UsersService], // se for usado em outro módulo
})
export class UsersModule {}
