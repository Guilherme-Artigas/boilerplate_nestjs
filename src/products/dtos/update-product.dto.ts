import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsUUID,
  IsBoolean,
} from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Name of the product',
    example: '5kg White Rice',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string

  @ApiPropertyOptional({
    description: 'Optional description of the product',
    example: 'Premium white rice, type 1 package',
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({
    description: 'Price of the product',
    example: 29.99,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number

  @ApiPropertyOptional({
    description: 'Available stock quantity',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number

  @ApiPropertyOptional({
    description: 'ID of the company that owns the product',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsOptional()
  @IsUUID()
  companyId?: string

  @ApiPropertyOptional({
    description: 'Indicates whether the product is active or not',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActived?: boolean
}
