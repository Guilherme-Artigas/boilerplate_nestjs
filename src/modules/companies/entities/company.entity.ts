import { BaseEntity } from '@common/entities/base.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export type CompanyKeys = keyof Company;

@Entity('companies')
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: true, default: '' })
    logoUrl: string;

    @OneToMany(() => Product, product => product.company)
    products: Product[];
}
