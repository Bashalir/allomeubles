import { Product, ProductFilter } from '../entities/Product'
import { ProductRepository } from '../repositories/ProductRepository'

export class ProductUseCases {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(filter?: ProductFilter): Promise<Product[]> {
    return this.productRepository.findAll(filter)
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id)
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    if (!this.validateProduct(product)) {
      throw new Error('Invalid product data')
    }
    return this.productRepository.create?.(product) || Promise.reject('Create not supported')
  }

  private validateProduct(product: Omit<Product, 'id'>): boolean {
    return !!(
      product.name && 
      product.price >= 0 && 
      product.description
    )
  }
}
