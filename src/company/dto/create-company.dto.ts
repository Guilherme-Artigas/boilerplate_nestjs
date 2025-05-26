import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty, Length, Matches } from 'class-validator';

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
    description: 'Telefone da empresa (formato: (99) 99999-9999)',
    example: '(11) 98765-4321',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\(\d{2}\) \d{5}-\d{4}$/, {
    message: 'O telefone deve estar no formato (99) 99999-9999',
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
}
