import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FruitsModule } from './fruits/fruits.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [FruitsModule, UsersModule, FruitsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
