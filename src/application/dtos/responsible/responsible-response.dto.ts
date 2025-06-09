import { Responsible } from '../../../domain/entities/responsible';

export class ResponsibleResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    cpf: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cpf = cpf;
  }

  static fromDomain(responsible: Responsible): ResponsibleResponseDto {
    return new ResponsibleResponseDto(
      responsible.id,
      responsible.name,
      responsible.email,
      responsible.phone,
      responsible.cpf,
    );
  }
}
