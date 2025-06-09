import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../entities/product.entity';
import { Product } from '../../../domain/entities/product';
import { CompanyEntity } from '../entities/company.entity';

@Injectable()
export class ProductTypeormRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productOrmRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productOrmRepository.find();

    return products.map((responsible) => this.toDomain(responsible));
  }
  async create(product: Product): Promise<void> {
    await this.productOrmRepository.save(this.toOrm(product));
  }
  async findOne(id: string): Promise<Product | null> {
    const product = await this.productOrmRepository.findOne({
      where: { id },
    });
    if (!product) {
      return null;
    }
    return this.toDomain(product);
  }
  async delete(id: string): Promise<boolean> {
    const product = await this.productOrmRepository.delete(id);
    return product.affected !== 0;
  }

  private toOrm(domain: Product): ProductEntity {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      price: domain.price,
      companyId: domain.companyId,
      company: { id: domain.companyId } as CompanyEntity,
    };
  }

  private toDomain(entity: ProductEntity): Product {
    return new Product(
      entity.name,
      entity.description,
      entity.price,
      entity.companyId,
      entity.id,
    );
  }
}
