import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'The name of the product',
        example: 'Smartphone XYZ',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'A brief description of the product',
        example: 'A high-end smartphone with advanced features',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The validity date of the product',
        example: '2025-12-31T23:59:59.000Z',
    })
    @IsNotEmpty()
    @IsDateString()
    validity: Date;

    @ApiProperty({
        description: 'The price of the product in numeric format',
        example: 1299.99,
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
