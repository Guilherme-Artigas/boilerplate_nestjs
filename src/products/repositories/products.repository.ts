import { Product } from '../entities/product.entity'
import { CreateProductDto } from '../dtos/create-product.dto'
import { UpdateProductDto } from '../dtos/update-product.dto'

export abstract class IProductsRepository {
  abstract create(data: CreateProductDto): Promise<Product>
  abstract findAll(): Promise<Product[]>
  abstract findById(id: string): Promise<Product | null>
  abstract update(id: string, data: UpdateProductDto): Promise<Product>
  abstract remove(id: string): Promise<void>
}
