import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from '../produto/typeorm-produto.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Produto, produto => produto.empresa)
  produtos: Produto[];
}
