import { UniqueEntityID } from '@core/entities/UniqueEntityId';
import { Company } from '@domain/company/enterprise/entities/Company';
import { Prisma } from 'prisma/generated/prisma';
export class PrismaCompanyMapper {
  static toDomain(raw) {
    return Company.create(
      {
        name: raw.name,
        cnpj: raw.cnpj,
        manager: raw.manager,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(company: Company): Prisma.CompanyUncheckedCreateInput {
    return {
      id: company.id.toString(),
      name: company.name,
      managerId: company.manager.id.toString(),
      cnpj: company.cnpj,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }
}
