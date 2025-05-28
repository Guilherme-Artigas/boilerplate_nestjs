import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length, Matches, IsBoolean } from 'class-validator';

export class UpdateCompanyDto {
  @ApiPropertyOptional({
    description: 'Nome da empresa',
    example: 'Empresa XYZ Atualizada',
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Telefone da empresa (apenas números)',
    example: '11987654321',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{11}$/, {
    message: 'O telefone deve conter exatamente 11 dígitos numéricos',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Email da empresa',
    example: 'novo@empresa.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'CPF/CNPJ da empresa (apenas números)',
    example: '12345678901',
  })
  @IsOptional()
  @IsString()
  @Length(11, 14)
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'O documento deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ)',
  })
  document?: string;

  @ApiPropertyOptional({
    description: 'Status de disponibilidade da empresa',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
