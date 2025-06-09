import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('responsibles')
export class ResponsibleEntity {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  cpf: string;
}
