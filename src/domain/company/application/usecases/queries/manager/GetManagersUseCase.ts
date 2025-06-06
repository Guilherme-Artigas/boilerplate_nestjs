import { IUseCase } from '@core/usecases/IUseCase';
import { IManagerRepository } from '../../../repositories/IManagerRepository';
import { ILogger } from '@core/lib/logger/logger.interface';
import { GetAllManagersOutputDto } from '../../../types/manager.types';
import { Inject } from '@nestjs/common';

export class GetManagersUseCase implements IUseCase {
  constructor(
    @Inject('IManagerRepository')
    private readonly managerRepository: IManagerRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(): Promise<GetAllManagersOutputDto | undefined> {
    try {
      const managers = await this.managerRepository.findAll();

      return managers.map((manager) => ({
        id: manager.id.toString(),
        name: manager.name,
        email: manager.email.value,
        phone: manager.phone,
        createdAt: manager.createdAt,
        updatedAt: manager.updatedAt,
      }));
    } catch (e) {
      const error = e as Error;
      this.logger.error(error.message, error);
      throw error;
    }
  }
}
