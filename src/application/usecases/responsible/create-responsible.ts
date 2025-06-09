import { Injectable } from '@nestjs/common';
import { ResponsibleRepository } from '../../../domain/repositories/responsible.repository';
import { CreateResponsibleDto } from '../../dtos/responsible/create-responsible.dto';
import { Responsible } from '../../../domain/entities/responsible';

@Injectable()
export class CreateResponsible {
  constructor(private readonly responsibleRepository: ResponsibleRepository) {}

  async execute(dto: CreateResponsibleDto): Promise<void> {
    const responsible = new Responsible(
      dto.name,
      dto.email,
      dto.phone,
      dto.cpf,
    );
    return await this.responsibleRepository.create(responsible);
  }
}
