import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'jhon doe',
  })
  @IsNotEmpty({ message: 'O campo name não pode estar vazio' })
  @IsString({ message: 'O campo name deve ser uma string' })
  name: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'jhondoe@email.com',
  })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio' })
  @IsString({ message: 'O campo email deve ser uma string' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário, com no mínimo 6 caracteres',
    example: 'senhaSegura123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio' })
  @IsString({ message: 'O campo senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}
