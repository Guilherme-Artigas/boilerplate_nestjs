import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PaginateQueryDto } from './paginate-query.dto';

export class PaginateOutputDto extends OmitType(PaginateQueryDto, ['pagination'] as const) {
    @ApiProperty({
        description: 'Total number of records found',
        example: 100,
    })
    totalDocs: number;

    @ApiProperty({
        description: 'Total number of pages available',
        example: 10,
    })
    totalPages: number;

    @ApiProperty({
        description: 'Current pagination counter',
        example: 1,
    })
    pagingCounter: number;

    @ApiProperty({
        description: 'Indicates if there is a previous page',
        example: true,
    })
    hasPrevPage: boolean;

    @ApiProperty({
        description: 'Indicates if there is a next page',
        example: true,
    })
    hasNextPage: boolean;

    @ApiProperty({
        description: 'Page number of the previous page, or null if not available',
        example: null,
    })
    prevPage: number | null;

    @ApiProperty({
        description: 'Page number of the next page, or null if not available',
        example: null,
    })
    nextPage: number | null;
}
