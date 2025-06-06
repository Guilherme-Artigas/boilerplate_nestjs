import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ManagerDto {
  @ApiProperty({ example: 'uuid', description: 'Manager unique identifier' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Manager name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john.doe@email.com', description: 'Manager email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '11999999999', description: 'Manager phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '12345678909', description: 'Manager CPF' })
  @IsString()
  @IsNotEmpty()
  cpf: string;
}
