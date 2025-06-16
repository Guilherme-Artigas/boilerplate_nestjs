import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsUrl,
  IsBoolean,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCompanyDto {
  @ApiProperty({ example: 'Acme Corporation', description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: '12.345.678/0001-90',
    description: 'Company document (CNPJ)',
  })
  @IsString()
  @IsNotEmpty()
  document: string

  @ApiProperty({ example: 'contact@acme.com', description: 'Company email' })
  @IsEmail()
  email: string

  @ApiProperty({ example: '+55 11 99999-9999', description: 'Company phone' })
  @IsString()
  @IsNotEmpty()
  phone: string

  @ApiPropertyOptional({
    example: 'https://www.acme.com',
    description: 'Company website',
  })
  @IsOptional()
  @IsUrl()
  website?: string

  @ApiProperty({
    example: '123 Main St, São Paulo, SP',
    description: 'Company address',
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty({
    example: true,
    description: 'Company status',
  })
  @IsBoolean()
  isActived?: boolean
}
