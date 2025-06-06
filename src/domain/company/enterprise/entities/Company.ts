import { Entity } from 'src/core/entities/Entity';
import { UniqueEntityID } from 'src/core/entities/UniqueEntityId';
import { Manager } from './Manager';

type CompanyProps = {
  name: string;
  manager: Manager;
  cnpj: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export class Company extends Entity<CompanyProps> {
  get name(): string {
    return this.props.name;
  }

  get manager(): Manager {
    return this.props.manager;
  }

  get cnpj(): string {
    return this.props.cnpj;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  static create(props: CompanyProps, id?: UniqueEntityID) {
    return new Company(props, id);
  }
}
