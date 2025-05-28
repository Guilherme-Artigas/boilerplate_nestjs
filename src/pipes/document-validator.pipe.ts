import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class DocumentValidatorPipe implements PipeTransform {
  transform(value: string) {
    const cleanDocument = value.replace(/[^\d]/g, '');

    if (cleanDocument.length === 11) {
      if (!cpf.isValid(cleanDocument)) {
        throw new BadRequestException('Invalid CPF');
      }
    } else if (cleanDocument.length === 14) {
      if (!cnpj.isValid(cleanDocument)) {
        throw new BadRequestException('Invalid CNPJ');
      }
    } else {
      throw new BadRequestException('Document must have 11 digits (CPF) or 14 digits (CNPJ)');
    }

    return cleanDocument;
  }
}
