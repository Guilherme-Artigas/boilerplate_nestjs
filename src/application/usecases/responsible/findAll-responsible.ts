import { Injectable } from '@nestjs/common';
import { ResponsibleRepository } from '../../../domain/repositories/responsible.repository';
import { Responsible } from '../../../domain/entities/responsible';

@Injectable()
export class FindAllResponsible {
  constructor(private readonly responsibleRepository: ResponsibleRepository) {}
  async execute(): Promise<Responsible[]> {
    return await this.responsibleRepository.findAll();
  }
}
