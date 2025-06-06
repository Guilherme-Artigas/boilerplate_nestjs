import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service'; // Importando o PrismaService

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exportando o PrismaService para ser usado em outros módulos
})
export class PrismaModule {}
