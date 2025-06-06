import { Entity } from 'src/core/entities/Entity';
import { Email } from './value-object/Email.vo';
import { UniqueEntityID } from 'src/core/entities/UniqueEntityId';
import { Document } from './value-object/Document.vo';
import { Company } from './Company';

type ManagerProps = {
  name: string;
  email: Email;
  phone: string;
  cpf: Document;
  company?: Company;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Manager extends Entity<ManagerProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }

  get cpf(): Document {
    return this.props.cpf;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get company(): Company | undefined {
    return this.props.company;
  }

  static create(props: ManagerProps, id?: UniqueEntityID) {
    return new Manager(props, id);
  }
}
