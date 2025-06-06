import { IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { BaseOutputDto } from '@common/dto/base-output.dto';

export class OutputCompanyDto extends OmitType(IntersectionType(CreateCompanyDto, BaseOutputDto), ['active']) {}
