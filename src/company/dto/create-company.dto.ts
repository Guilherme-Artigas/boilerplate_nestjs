import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  IsBoolean,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Empresa XYZ',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @ApiProperty({
    description: 'Telefone da empresa (apenas números)',
    example: '11987654321',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{11}$/, {
    message: 'O telefone deve conter exatamente 11 dígitos numéricos',
  })
  phone?: string;

  @ApiProperty({
    description: 'Email da empresa',
    example: 'contato@empresa.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'CPF/CNPJ da empresa (apenas números)',
    example: '12345678901',
  })
  @IsNotEmpty()
  @IsString()
  @Length(11, 14)
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'O documento deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ)',
  })
  document: string;

  @ApiProperty({
    description: 'Status de disponibilidade da empresa',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean = true;
}
