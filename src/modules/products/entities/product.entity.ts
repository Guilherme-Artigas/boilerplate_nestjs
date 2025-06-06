import { BaseEntity } from '@common/entities/base.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false, type: 'timestamp' })
    validity: Date;

    @Column({ nullable: false })
    price: number;

    @ManyToOne(() => Company, company => company.products, { nullable: false, onDelete: 'CASCADE' })
    company: Company;
}
