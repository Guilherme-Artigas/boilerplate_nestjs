import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFruitDto {
  @ApiProperty({ example: 'Banana' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Fruta tropical rica em potássio', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 2.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'user_id_exemplo' })
  @IsString()
  authorId: string;
}
