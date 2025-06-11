import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Updated Smartphone X',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Updated model with new features',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Product price',
    example: 899.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({
    description: 'Product stock quantity',
    example: 150,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
