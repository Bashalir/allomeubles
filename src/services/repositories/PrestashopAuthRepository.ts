import axios from 'axios'
import { IAuthRepository, LoginCredentials, RegisterCredentials } from '../interfaces/IAuthRepository'
import { Customer } from '../../types/prestashop'

export class PrestashopAuthRepository implements IAuthRepository {
  private apiUrl: string
  private apiKey: string

  constructor() {
    this.apiUrl = import.meta.env.VITE_PRESTASHOP_API_URL
    this.apiKey = import.meta.env.VITE_PRESTASHOP_API_KEY
  }

  private createAxiosInstance() {
    return axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${this.apiKey}:`)}`
      }
    })
  }

  async login({ email, password }: LoginCredentials): Promise<Customer> {
    try {
      const client = this.createAxiosInstance()
      
      // Authentification via l'API PrestaShop
      const response = await client.post('/customers', {
        email,
        password
      })

      return response.data.customer
    } catch (error) {
      console.error('Erreur de connexion', error)
      throw new Error('Impossible de se connecter')
    }
  }

  async register({ email, password, firstName, lastName }: RegisterCredentials): Promise<Customer> {
    try {
      const client = this.createAxiosInstance()
      
      const response = await client.post('/customers', {
        email,
        passwd: password,
        firstname: firstName,
        lastname: lastName
      })

      return response.data.customer
    } catch (error) {
      console.error('Erreur d\'inscription', error)
      throw new Error('Impossible de créer le compte')
    }
  }

  async logout(): Promise<void> {
    // Implémentation de la déconnexion côté PrestaShop
    // Peut nécessiter une gestion de token ou de session
  }

  async getCurrentUser(): Promise<Customer | null> {
    try {
      const client = this.createAxiosInstance()
      
      // Récupérer l'utilisateur connecté
      // Peut nécessiter un token ou un identifiant de session
      const response = await client.get('/customers/me')
      
      return response.data.customer
    } catch (error) {
      return null
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      const client = this.createAxiosInstance()
      
      await client.post('/password', { email })
    } catch (error) {
      console.error('Erreur de réinitialisation de mot de passe', error)
      throw new Error('Impossible de réinitialiser le mot de passe')
    }
  }
}

export const prestashopAuthRepository = new PrestashopAuthRepository()
