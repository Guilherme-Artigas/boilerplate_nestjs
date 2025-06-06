import { ILogger } from '@core/lib/logger/logger.interface';
import { IManagerRepository } from '../../../repositories/IManagerRepository';
import { IUseCase } from '@core/usecases/IUseCase';
import { Inject } from '@nestjs/common';
import { Email } from '@domain/company/enterprise/entities/value-object/Email.vo';
import { Document } from '@domain/company/enterprise/entities/value-object/Document.vo';
import { Manager } from '@domain/company/enterprise/entities/Manager';
import {
  CreateManagerInputDto,
  CreateManagerOutputDto,
} from '@domain/company/application/types/manager.types';

export class CreateManagerUseCase implements IUseCase {
  constructor(
    @Inject('IManagerRepository')
    private readonly managerRepository: IManagerRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: CreateManagerInputDto
  ): Promise<CreateManagerOutputDto | undefined> {
    try {
      const email = Email.create(data.email);
      const cpf = Document.create(data.cpf);
      const manager = Manager.create({
        name: data.name,
        email,
        phone: data.phone,
        cpf,
      });
      await this.managerRepository.create(manager);
      return {
        id: manager.id.toString(),
        name: manager.name,
        email: manager.email.value,
        phone: manager.phone,
        createdAt: manager.createdAt,
        updatedAt: manager.updatedAt,
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
