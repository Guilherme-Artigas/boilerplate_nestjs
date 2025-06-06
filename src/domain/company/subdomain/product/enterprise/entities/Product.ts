import { Entity } from '@core/entities/Entity';
import { UniqueEntityID } from '@core/entities/UniqueEntityId';
import { Company } from '@domain/company/enterprise/entities/Company';

type ProductProps = {
  name: string;
  description?: string;
  price: number;
  company: Company;
  createdAt?: Date;
  updatedAt?: Date;
};
export class Product extends Entity<ProductProps> {
  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get price(): number {
    return this.props.price;
  }

  get company(): Company {
    return this.props.company;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  static create(
    props: Omit<ProductProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ): Product {
    return new Product(props, id);
  }
}
