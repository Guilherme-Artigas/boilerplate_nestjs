import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Smartphone X',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Latest model with high-end features',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Product price',
    example: 999.99,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Product stock quantity',
    example: 100,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiProperty({
    description: 'ID of the company that produces this product',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}
