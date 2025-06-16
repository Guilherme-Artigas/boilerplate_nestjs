import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsUUID,
  Min,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: '5kg White Rice',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Optional description of the product',
    example: 'Premium white rice, type 1 package',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({
    description: 'Price of the product',
    example: 29.99,
  })
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({
    description: 'Available stock quantity',
    example: 100,
  })
  @IsNumber()
  @Min(0)
  stock: number

  @ApiProperty({
    description: 'ID of the company that owns the product',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsUUID()
  companyId: string

  @ApiProperty({
    description: 'Indicates whether the product is active or not',
    example: true,
  })
  @IsBoolean()
  isActived?: boolean
}
