import { ApiProperty } from '@nestjs/swagger';

export class BaseOutputDto {
    @ApiProperty({
        description: 'Unique identifier for the record',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Indicates whether the record is active',
        example: true,
    })
    active: boolean;

    @ApiProperty({
        description: 'Date when the record was created',
        example: '2023-04-06T11:54:03.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the record was last updated',
        example: '2023-05-30T12:20:00.000Z',
    })
    updatedAt: Date;
}
