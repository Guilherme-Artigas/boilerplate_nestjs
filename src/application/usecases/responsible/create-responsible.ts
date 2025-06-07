import { Injectable } from '@nestjs/common';
import { ResponsibleRepository } from '../../../domain/repositories/responsible.repository';
import { Responsible } from '../../../domain/entities/responsible';

@Injectable()
export class CreateResponsible {
  constructor(private readonly responsibleRepository: ResponsibleRepository) {}

  async execute(responsible: Responsible): Promise<void> {
    return await this.responsibleRepository.create(responsible);
  }
}
