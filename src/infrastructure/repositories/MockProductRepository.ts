import { ProductRepository } from '../../core/repositories/ProductRepository'
import { Product, ProductFilter } from '../../core/entities/Product'
import mockData from '../../tests/mocks/products.json'

export class MockProductRepository implements ProductRepository {
  async findAll(filter?: ProductFilter): Promise<Product[]> {
    let products = mockData.products

    if (filter) {
      // Filtrage par catégorie
      if (filter.categoryId) {
        products = products.filter(p => 
          p.category_id === filter.categoryId
        )
      }

      // Filtrage par prix
      if (filter.minPrice !== undefined) {
        products = products.filter(p => p.price >= filter.minPrice!)
      }

      if (filter.maxPrice !== undefined) {
        products = products.filter(p => p.price <= filter.maxPrice!)
      }

      // Filtrage par terme de recherche
      if (filter.searchTerm) {
        const searchTerm = filter.searchTerm.toLowerCase()
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
        )
      }
    }

    return products
  }

  async findById(id: number): Promise<Product | null> {
    const product = mockData.products.find(p => p.id === id)
    return product || null
  }

  // Méthodes optionnelles pour création/modification
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const newProduct = {
      ...product,
      id: mockData.products.length + 1
    }
    mockData.products.push(newProduct)
    return newProduct
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const index = mockData.products.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }

    mockData.products[index] = {
      ...mockData.products[index],
      ...product
    }

    return mockData.products[index]
  }

  async delete(id: number): Promise<void> {
    const index = mockData.products.findIndex(p => p.id === id)
    if (index !== -1) {
      mockData.products.splice(index, 1)
    }
  }
}
