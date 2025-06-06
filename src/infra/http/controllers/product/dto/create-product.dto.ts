import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Product name', description: 'Product name' })
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
    required: false,
  })
  description?: string;

  @ApiProperty({ example: 100.5, description: 'Product price' })
  price: number;

  @ApiProperty({ example: 'uuid', description: 'Company unique identifier' })
  companyId: string;
}
