import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsibleRepository } from '../../../domain/repositories/responsible.repository';
import { Responsible } from '../../../domain/entities/responsible';
import { ResponsibleEntity } from '../entities/responsible.entity';

@Injectable()
export class ResponsibleTypeormRepository implements ResponsibleRepository {
  constructor(
    @InjectRepository(ResponsibleEntity)
    private readonly responsibleOrmRepository: Repository<ResponsibleEntity>,
  ) {}

  async findAll(): Promise<Responsible[]> {
    const responsibles = await this.responsibleOrmRepository.find();

    return responsibles.map((responsible) => this.toDomain(responsible));
  }
  async create(responsible: Responsible): Promise<void> {
    await this.responsibleOrmRepository.save(this.toOrm(responsible));
  }
  async findOne(id: string): Promise<Responsible | null> {
    const responsible = await this.responsibleOrmRepository.findOne({
      where: { id },
    });
    if (!responsible) {
      return null;
    }
    return this.toDomain(responsible);
  }
  async delete(id: string): Promise<boolean> {
    const responsible = await this.responsibleOrmRepository.delete(id);
    return responsible.affected !== 0;
  }

  private toOrm(domain: Responsible): ResponsibleEntity {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      phone: domain.phone,
      cpf: domain.cpf,
    };
  }

  private toDomain(entity: ResponsibleEntity): Responsible {
    return new Responsible(
      entity.id,
      entity.name,
      entity.email,
      entity.phone,
      entity.cpf,
    );
  }
}
