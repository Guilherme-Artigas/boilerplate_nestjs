import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({ example: 'SpaceX', description: 'Nome da empresa' })
  @IsString()
  @IsNotEmpty()
  nome: string;
}
