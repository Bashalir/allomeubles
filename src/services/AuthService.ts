import { IAuthRepository } from './interfaces/IAuthRepository'
import { mockAuthRepository } from './repositories/MockAuthRepository'
import { prestashopAuthRepository } from './repositories/PrestashopAuthRepository'

export class AuthService {
  private repository: IAuthRepository

  constructor() {
    // Sélectionner le repository en fonction de l'environnement
    this.repository = import.meta.env.PROD 
      ? prestashopAuthRepository 
      : mockAuthRepository
  }

  // Méthodes déléguées
  login = async (credentials) => {
    return this.repository.login(credentials)
  }

  register = async (credentials) => {
    return this.repository.register(credentials)
  }

  logout = async () => {
    return this.repository.logout()
  }

  getCurrentUser = async () => {
    return this.repository.getCurrentUser()
  }

  resetPassword = async (email: string) => {
    return this.repository.resetPassword?.(email)
  }
}

// Singleton
export const authService = new AuthService()
