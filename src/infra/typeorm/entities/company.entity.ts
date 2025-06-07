import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Responsible } from '../../../domain/entities/responsible';
import { ResponsibleEntity } from './responsible.entity';

@Entity('companies')
export class CompanyEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;

  @ManyToOne(() => ResponsibleEntity, { eager: true })
  @JoinColumn({ name: 'responsibleId' })
  responsible: Responsible;
}
