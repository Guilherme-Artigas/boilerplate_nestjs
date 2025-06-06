import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginateQueryDto {
    @ApiProperty({
        description: 'Use false to disable pagination',
        example: true,
        required: false,
        default: true,
    })
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    pagination: boolean = true;

    @ApiProperty({
        description: 'Page number to retrieve',
        example: 1,
        required: false,
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    page: number = 1;

    @ApiProperty({
        description: 'Number of items per page',
        example: 10,
        required: false,
        default: 10,
    })
    @IsOptional()
    @Type(() => Number)
    limit: number = 10;
}
