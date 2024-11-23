import axios, { AxiosInstance } from 'axios'
import { 
  Product, 
  Category, 
  ProductFeature, 
  ProductOption, 
  Customer, 
  Order, 
  Address, 
  Carrier, 
  Language, 
  Country, 
  Currency 
} from '../../types'
import { IPrestashopService } from '../interfaces/IPrestashopService'

export class PrestashopApiClient implements IPrestashopService {
  private client: AxiosInstance
  private apiKey: string
  private shopId: string
  private defaultLanguageId: string
  private defaultCurrencyId: string

  constructor() {
    this.apiKey = import.meta.env.VITE_PRESTASHOP_API_KEY
    this.shopId = import.meta.env.VITE_PRESTASHOP_SHOP_ID
    this.defaultLanguageId = import.meta.env.VITE_PRESTASHOP_DEFAULT_LANGUAGE_ID
    this.defaultCurrencyId = import.meta.env.VITE_PRESTASHOP_DEFAULT_CURRENCY_ID

    this.client = axios.create({
      baseURL: import.meta.env.VITE_PRESTASHOP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${this.apiKey}:`)}`
      }
    })
  }

  // Méthodes d'implémentation des interfaces
  async getProducts(params = {}): Promise<Product[]> {
    try {
      const response = await this.client.get('/products', { params })
      return response.data.products
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error)
      throw error
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const response = await this.client.get(`/products/${id}`)
      return response.data.product
    } catch (error) {
      console.error(`Erreur lors de la récupération du produit ${id}`, error)
      throw error
    }
  }

  async getProductImages(productId: number): Promise<string[]> {
    try {
      const response = await this.client.get(`/images/products/${productId}`)
      return response.data.images.map((img: any) => img.url)
    } catch (error) {
      console.error(`Erreur lors de la récupération des images du produit ${productId}`, error)
      throw error
    }
  }

  // Autres méthodes similaires pour les différentes ressources...
  async getCategories(params = {}): Promise<Category[]> {
    try {
      const response = await this.client.get('/categories', { params })
      return response.data.categories
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error)
      throw error
    }
  }

  // Méthodes à implémenter de manière similaire pour les autres ressources
  async getProductFeatures(): Promise<ProductFeature[]> {
    try {
      const response = await this.client.get('/product_features')
      return response.data.product_features
    } catch (error) {
      console.error('Erreur lors de la récupération des caractéristiques', error)
      throw error
    }
  }

  // Autres méthodes... (createCustomer, createOrder, etc.)
}

// Singleton pour faciliter l'utilisation
export const prestashopService = new PrestashopApiClient()
