import { Product } from '../../domain/entities/product';

export class ProductResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  companyId: string;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    companyId: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.companyId = companyId;
  }

  static fromDomain(product: Product): ProductResponseDto {
    return new ProductResponseDto(
      product.id,
      product.name,
      product.description,
      product.price,
      product.companyId,
    );
  }
}
