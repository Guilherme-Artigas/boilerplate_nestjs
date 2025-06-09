import { Injectable } from '@nestjs/common';
import { ResponsibleRepository } from '../../../domain/repositories/responsible.repository';
import { ResponsibleResponseDto } from '../../dtos/responsible/responsible-response.dto';

@Injectable()
export class FindAllResponsible {
  constructor(private readonly responsibleRepository: ResponsibleRepository) {}
  async execute(): Promise<ResponsibleResponseDto[]> {
    const responsibles = await this.responsibleRepository.findAll();
    return responsibles.map((responsible) =>
      ResponsibleResponseDto.fromDomain(responsible),
    );
  }
}
