import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class DocumentValidatorPipe implements PipeTransform {
  transform(value: string) {
    const cleanDocument = value.replace(/[^\d]/g, '');

    if (cleanDocument.length === 11) {
      if (!cpf.isValid(cleanDocument)) {
        throw new BadRequestException('CPF inválido');
      }
    } else if (cleanDocument.length === 14) {
      if (!cnpj.isValid(cleanDocument)) {
        throw new BadRequestException('CNPJ inválido');
      }
    } else {
      throw new BadRequestException('Documento deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ)');
    }

    return cleanDocument;
  }
}
