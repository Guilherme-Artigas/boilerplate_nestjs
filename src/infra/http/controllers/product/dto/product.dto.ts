import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyDto } from '../../company/dto/company.dto';

export class ProductDto {
  @ApiProperty({ example: 'uuid', description: 'Product unique identifier' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Product name', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 100.5, description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ type: CompanyDto, description: 'Product company' })
  company: CompanyDto;
}
