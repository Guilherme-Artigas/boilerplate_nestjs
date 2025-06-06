import { IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { BaseOutputDto } from '@common/dto/base-output.dto';

export class OutputProductDto extends OmitType(IntersectionType(CreateProductDto, BaseOutputDto), ['active']) {}
