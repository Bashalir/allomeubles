import { Product, ProductFilter } from '../entities/Product'

export interface ProductRepository {
  findAll(filter?: ProductFilter): Promise<Product[]>
  findById(id: number): Promise<Product | null>
  create?(product: Omit<Product, 'id'>): Promise<Product>
  update?(id: number, product: Partial<Product>): Promise<Product>
  delete?(id: number): Promise<void>
}
