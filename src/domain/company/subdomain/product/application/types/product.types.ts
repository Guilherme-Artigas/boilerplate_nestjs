import { Company } from '@domain/company/enterprise/entities/Company';

export type ProductDto = {
  id: string;
  name: string;
  description?: string;
  price: number;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateProductInputDto = Omit<
  ProductDto,
  'id' | 'createdAt' | 'updatedAt'
>;
export type CreateProductOutputDto = {
  id: string;
  name: string;
  description?: string;
  price: number;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
};
export type GetProductByIdInputDto = {
  id: string;
};

export type GetProductByIdOutputDto = {
  id: string;
  name: string;
  description?: string;
  price: number;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateProductInputDto = Partial<ProductDto>;

export type UpdateProductOutputDto = CreateProductOutputDto;

export type DeleteProductInputDto = {
  id: string;
};

export type DeleteProductOutputDto = {
  id: string;
};

export type GetAllProductsOutputDto = GetProductByIdOutputDto[];
