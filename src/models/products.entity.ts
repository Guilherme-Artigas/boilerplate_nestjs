import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false, default: 'unkown product' })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @ManyToOne(() => Company, (company) => company.products)
  company: Company;
}
