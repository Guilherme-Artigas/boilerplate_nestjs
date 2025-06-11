import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'The name of the company',
    example: 'Tech Solutions Inc.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Company CNPJ (Brazilian corporate tax ID)',
    example: '12.345.678/0001-90',
  })
  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @ApiProperty({
    description: 'Company address',
    example: '123 Main St, São Paulo, SP',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;
}
