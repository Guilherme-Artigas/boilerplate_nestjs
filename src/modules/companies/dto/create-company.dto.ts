import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
    @ApiProperty({
        description: 'The name of the company. This field is required.',
        example: 'Tech Solutions Ltd.',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'URL of the company logo. Optional field.',
        example: 'https://company.com/logo.png',
    })
    @IsOptional()
    @IsString()
    logoUrl: string;
}
