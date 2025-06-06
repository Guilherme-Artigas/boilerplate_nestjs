import { ApiProperty } from '@nestjs/swagger';
import { OutputProductDto } from './output-product.dto';
import { PaginateOutputDto } from '@common/dto/paginate-output.dto';

export class ProductsOutputPaginateDto extends PaginateOutputDto {
    @ApiProperty({
        description: 'List of products in the current paginated result',
        type: OutputProductDto,
        isArray: true,
    })
    data: OutputProductDto[];
}
