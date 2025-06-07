import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponsibleRepository } from '../../../domain/repositories/responsible.repository';
import { Responsible } from '../../../domain/entities/responsible';

@Injectable()
export class FindOneResponsible {
  constructor(private readonly responsibleRepository: ResponsibleRepository) {}
  async execute(id: string): Promise<Responsible | null> {
    const responsible = await this.responsibleRepository.findOne(id);
    if (!responsible) {
      throw new NotFoundException(
        `o id: ${id} de responsible não foi encontrado`,
      );
    }
    return responsible;
  }
}
