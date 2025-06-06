import { PartialType } from '@nestjs/mapped-types';
import { CompanyDto } from './company.dto';

export class UpdateCompanyDto extends PartialType(CompanyDto) {}
