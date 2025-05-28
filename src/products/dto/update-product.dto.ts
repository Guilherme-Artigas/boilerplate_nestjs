import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Nome do produto',
    example: 'Produto XYZ Atualizado',
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Descrição do produto',
    example: 'Nova descrição do produto',
  })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string;

  @ApiPropertyOptional({
    description: 'Valor do produto',
    example: 99.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  value?: number;

  @ApiPropertyOptional({
    description: 'Status de disponibilidade do produto',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
