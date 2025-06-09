import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ResponsibleEntity } from './responsible.entity';

@Entity('companies')
export class CompanyEntity {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  name: string;

  @ManyToOne(() => ResponsibleEntity, { eager: true })
  @JoinColumn({ name: 'responsibleId' })
  responsible: ResponsibleEntity;
}
