import { UniqueEntityID } from '@core/entities/UniqueEntityId';
import { Manager } from '@domain/company/enterprise/entities/Manager';
import { Prisma } from 'prisma/generated/prisma';

export class PrismaManagerMapper {
  static toDomain(raw): Manager {
    return Manager.create(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        cpf: raw.cpf,
        company: raw.company,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(manager: Manager): Prisma.ManagerUncheckedCreateInput {
    return {
      id: manager.id.toString(),
      name: manager.name,
      cpf: manager.cpf.getValue(),
      email: manager.email.value,
      phone: manager.phone,
      createdAt: manager.createdAt,
      updatedAt: manager.updatedAt,
    };
  }
}
