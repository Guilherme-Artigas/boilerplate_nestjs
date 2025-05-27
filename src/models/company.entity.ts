import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { IsString, Matches } from 'class-validator';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 11, nullable: true })
  @IsString()
  @Matches(/^[0-9]{11}$/, { message: 'Phone must contain exactly 11 digits' })
  phone: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, length: 11, nullable: false })
  document: string;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => Products, (product) => product.company)
  products: Products[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
