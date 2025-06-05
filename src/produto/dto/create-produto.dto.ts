import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({ example: 'Celular Android' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 1999.99 })
  @IsNumber()
  preco: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  empresaId: number;
}
