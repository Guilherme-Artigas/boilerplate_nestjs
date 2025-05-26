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
    description: 'Telefone da empresa (formato: (99) 99999-9999)',
    example: '(11) 98765-4321',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\(\d{2}\) \d{5}-\d{4}$/, {
    message: 'O telefone deve estar no formato (99) 99999-9999',
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
