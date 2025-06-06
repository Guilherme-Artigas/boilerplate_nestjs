import { UniqueEntityID } from '@core/entities/UniqueEntityId';
import { Company } from '@domain/company/enterprise/entities/Company';
import { Product } from '@domain/company/subdomain/product/enterprise/entities/Product';
import { Prisma } from 'prisma/generated/prisma';

export class PrismaProductMapper {
  static toDomain(raw): Product {
    return Product.create(
      {
        company: Company.create(
          {
            manager: raw.company.manager,
            cnpj: raw.company.cnpj,
            name: raw.company.name,
          },
          raw.company.id
        ),
        name: raw.name,
        price: raw.price,
        description: raw.description,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      companyId: product.company.id.toString(),
      price: product.price,
      description: product.description,
      name: product.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
