import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsUrl,
  IsNotEmpty,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateCompanyDto {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'Company UUID',
  })
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiPropertyOptional({
    example: 'Acme Corporation',
    description: 'Company name',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({
    example: '12.345.678/0001-90',
    description: 'Company document (CNPJ)',
  })
  @IsOptional()
  @IsString()
  document?: string

  @ApiPropertyOptional({
    example: 'contact@acme.com',
    description: 'Company email',
  })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional({
    example: '+55 11 99999-9999',
    description: 'Company phone',
  })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiPropertyOptional({
    example: 'https://www.acme.com',
    description: 'Company website',
  })
  @IsOptional()
  @IsUrl()
  website?: string

  @ApiPropertyOptional({
    example: '123 Main St, São Paulo, SP',
    description: 'Company address',
  })
  @IsOptional()
  @IsString()
  address?: string

  @ApiPropertyOptional({
    example: 'active',
    description: 'Company status',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive'
}
