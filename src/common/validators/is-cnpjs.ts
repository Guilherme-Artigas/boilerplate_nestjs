// src/common/validators/is-cnpj.ts
import { registerDecorator, ValidationOptions } from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCnpj',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && cnpj.isValid(value);
        },
        defaultMessage() {
          return 'CNPJ inválido';
        },
      },
    });
  };
}
