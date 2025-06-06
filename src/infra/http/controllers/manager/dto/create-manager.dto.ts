import { ApiProperty } from '@nestjs/swagger';

export class CreateManagerDto {
  @ApiProperty({ example: 'John Doe', description: 'Manager name' })
  name: string;

  @ApiProperty({ example: 'john.doe@email.com', description: 'Manager email' })
  email: string;

  @ApiProperty({ example: '11999999999', description: 'Manager phone number' })
  phone: string;

  @ApiProperty({ example: '12345678909', description: 'Manager CPF' })
  cpf: string;
}
