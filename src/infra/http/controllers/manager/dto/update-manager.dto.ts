import { PartialType } from '@nestjs/mapped-types';
import { ManagerDto } from './manager.dto';

export class UpdateManagerDto extends PartialType(ManagerDto) {}
