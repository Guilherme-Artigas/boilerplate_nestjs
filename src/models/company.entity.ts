import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from './products.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 14, nullable: true })
  phone: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, length: 11, nullable: false })
  document: string;

  @OneToMany(() => Products, (product) => product.company)
  products: Products[];
}
