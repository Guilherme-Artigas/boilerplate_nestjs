import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ManagerDto } from './manager.dto';

export class CompanyDto {
  @ApiProperty({ example: 'uuid', description: 'Company unique identifier' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Acme Inc.', description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: ManagerDto, description: 'Company manager' })
  manager: ManagerDto;

  @ApiProperty({ example: '12345678000100', description: 'Company CNPJ' })
  @IsString()
  cnpj: string;
}
