import { Product, ApiResponse } from '../../types'

export interface IProductRepository {
  getAll(): Promise<ApiResponse<Product[]>>
  getById(id: number): Promise<ApiResponse<Product>>
  searchByName(name: string): Promise<ApiResponse<Product[]>>
  getByCategory(category: string): Promise<ApiResponse<Product[]>>
}
