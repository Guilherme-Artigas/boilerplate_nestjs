import { ILogger } from '@core/lib/logger/logger.interface';
import { IManagerRepository } from '../../../repositories/IManagerRepository';
import { IUseCase } from '@core/usecases/IUseCase';
import {
  UpdateManagerInputDto,
  UpdateManagerOutputDto,
} from '../../../types/manager.types';
import { CustomError } from '@core/errors/CustomError';
import { UniqueEntityID } from '@core/entities/UniqueEntityId';
import { Inject } from '@nestjs/common';
import { Manager } from '@domain/company/enterprise/entities/Manager';
import { Email } from '@domain/company/enterprise/entities/value-object/Email.vo';
import { Document } from '@domain/company/enterprise/entities/value-object/Document.vo';

export class UpdateManagerUseCase implements IUseCase {
  constructor(
    @Inject('IManagerRepository')
    private readonly managerRepository: IManagerRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: UpdateManagerInputDto
  ): Promise<UpdateManagerOutputDto | undefined> {
    try {
      const manager = await this.managerRepository.findOne(data.id);
      if (!manager) {
        this.logger.error(
          `Manager with id ${data.id} not found`,
          new CustomError('NotFound', 404)
        );
        throw new CustomError(`Manager with id ${data.id} not found`, 404);
      }

      const updatedManager = Manager.create(
        {
          name: data.name || manager.name,
          email: Email.create(data.email) || manager.email,
          phone: data.phone || manager.phone,
          cpf: Document.create(data.cpf) || manager.cpf,
          createdAt: manager.createdAt,
          updatedAt: new Date(),
        },
        new UniqueEntityID(data.id || manager.id.toString())
      );

      const result = await this.managerRepository.save(updatedManager);

      return {
        id: result.id.toString(),
        name: result.name,
        email: result.email.value,
        phone: result.phone,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
