import { v4 as uuidv4 } from 'uuid';

export class Responsible {
  public id: string;
  public name: string;
  public email: string;
  public phone: string;
  public cpf: string;
  constructor(
    name: string,
    email: string,
    phone: string,
    cpf: string,
    id?: string,
  ) {
    this.id = id ?? uuidv4();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cpf = cpf;
  }
}
