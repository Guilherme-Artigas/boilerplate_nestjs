import { PaginateQueryDto } from '@common/dto/paginate-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProductsQueryPaginateDto extends PaginateQueryDto {
    @ApiProperty({
        description: 'Keyword to search for products by name or description',
        example: 'smartphone',
        required: false,
    })
    @IsOptional()
    @IsString()
    search: string;
}
