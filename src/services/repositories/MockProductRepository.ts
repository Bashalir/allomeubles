import { IProductRepository } from '../interfaces/IProductRepository'
import { Product, Category, ApiResponse } from '../../types/prestashop'
import mockData from '../../tests/mocks/products.json'

export class MockProductRepository implements IProductRepository {
  async getAll(params?: { 
    limit?: number, 
    page?: number, 
    categoryId?: number 
  }): Promise<ApiResponse<Product[]>> {
    let products = mockData.products

    // Filtrage par catégorie si spécifié
    if (params?.categoryId) {
      products = products.filter(p => p.category_id === params.categoryId)
    }

    // Pagination
    if (params?.limit && params?.page) {
      const start = (params.page - 1) * params.limit
      const end = start + params.limit
      products = products.slice(start, end)
    }

    return {
      data: products,
      status: 200,
      message: 'Produits récupérés avec succès'
    }
  }

  async getById(id: number): Promise<ApiResponse<Product>> {
    const product = mockData.products.find(p => p.id === id)
    
    if (!product) {
      return {
        data: {} as Product,
        status: 404,
        message: 'Produit non trouvé'
      }
    }

    return {
      data: product,
      status: 200,
      message: 'Produit récupéré avec succès'
    }
  }

  async getCategories(params?: { 
    limit?: number, 
    page?: number 
  }): Promise<ApiResponse<Category[]>> {
    let categories = mockData.categories

    // Pagination
    if (params?.limit && params?.page) {
      const start = (params.page - 1) * params.limit
      const end = start + params.limit
      categories = categories.slice(start, end)
    }

    return {
      data: categories,
      status: 200,
      message: 'Catégories récupérées avec succès'
    }
  }

  async searchByName(name: string): Promise<ApiResponse<Product[]>> {
    const filteredProducts = mockData.products.filter(p => 
      p.name.toLowerCase().includes(name.toLowerCase())
    )

    return {
      data: filteredProducts,
      status: 200,
      message: 'Recherche de produits terminée'
    }
  }

  async getByCategory(category: string): Promise<ApiResponse<Product[]>> {
    const filteredProducts = mockData.products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    )

    return {
      data: filteredProducts,
      status: 200,
      message: 'Produits par catégorie récupérés'
    }
  }
}

export const mockProductRepository = new MockProductRepository()
