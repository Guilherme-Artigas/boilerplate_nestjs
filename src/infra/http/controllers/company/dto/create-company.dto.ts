import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Acme Inc.', description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '12345678000100', description: 'Company CNPJ' })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ example: 'uuid', description: 'Manager unique identifier' })
  managerId: string;
}
