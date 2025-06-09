import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponsibleRepository } from '../../../domain/repositories/responsible.repository';

@Injectable()
export class DeleteResponsible {
  constructor(private readonly responsibleRepository: ResponsibleRepository) {}

  async execute(id: string): Promise<boolean> {
    const responsible = await this.responsibleRepository.delete(id);
    if (!responsible) {
      throw new NotFoundException(
        `o id: ${id} de responsible não foi encontrado`,
      );
    }
    return responsible;
  }
}
