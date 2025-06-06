import { IUseCase } from '@core/usecases/IUseCase';
import { IManagerRepository } from '../../../repositories/IManagerRepository';
import { ILogger } from '@core/lib/logger/logger.interface';
import { CustomError } from '@core/errors/CustomError';
import {
  GetManagerByIdInputDto,
  GetManagerByIdOutputDto,
} from '../../../types/manager.types';
import { Inject } from '@nestjs/common';

export class GetManagerByIdUseCase implements IUseCase {
  constructor(
    @Inject('IManagerRepository')
    private readonly managerRepository: IManagerRepository,
    @Inject('ILogger') private logger: ILogger
  ) {}
  async execute(
    data: GetManagerByIdInputDto
  ): Promise<GetManagerByIdOutputDto | undefined> {
    try {
      const manager = await this.managerRepository.findOne(data.id);

      if (!manager) {
        this.logger.error(
          `Manager with id ${data.id} not found`,
          new CustomError('NotFound', 404)
        );
        throw new CustomError(`Manager with id ${data.id} not found`, 404);
      }
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
