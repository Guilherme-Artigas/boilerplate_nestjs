import { PartialType } from '@nestjs/swagger';
import { CreateEmpresaDto } from './create-empresa.dto';

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {}
