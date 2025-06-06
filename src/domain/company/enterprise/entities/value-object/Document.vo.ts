import { CustomError } from '@core/errors/CustomError';

export class Document {
  private readonly value: string;

  constructor(document: string) {
    const cleanDoc = document.replace(/\D/g, '');

    this.value = cleanDoc;
  }

  private isValidCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let remainder = (sum * 10) % 11;
    const digit1 = remainder === 10 || remainder === 11 ? 0 : remainder;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    const digit2 = remainder === 10 || remainder === 11 ? 0 : remainder;

    return (
      parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2
    );
  }

  public getValue(): string {
    return this.value;
  }

  public format(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  public equals(document: Document): boolean {
    return this.value === document.value;
  }

  public toString(): string {
    return this.value;
  }

  static create(document: string): Document {
    const instance = new Document(document);

    if (!instance.isValidCPF(instance.value)) {
      throw new CustomError('Invalid CPF', 400);
    }

    return instance;
  }
}
