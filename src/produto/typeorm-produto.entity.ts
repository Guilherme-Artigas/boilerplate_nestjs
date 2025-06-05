import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Empresa } from '../empresa/empresa.entity';

@Entity()
export class Produto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column('decimal')
  preco: number;

  @ManyToOne(() => Empresa, empresa => empresa.produtos, { eager: true })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column()
  empresaId: number;

}
