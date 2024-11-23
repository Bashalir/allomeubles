import { IAuthRepository, LoginCredentials, RegisterCredentials } from '../interfaces/IAuthRepository'
import { Customer } from '../../types/prestashop'

export class MockAuthRepository implements IAuthRepository {
  private currentUser: Customer | null = null
  private mockUsers: Customer[] = [
    {
      id: 1,
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe'
    }
  ]

  async login({ email, password }: LoginCredentials): Promise<Customer> {
    // Simulation de connexion
    const user = this.mockUsers.find(u => u.email === email)
    
    if (user && password === 'password123') {
      this.currentUser = user
      return user
    }

    throw new Error('Identifiants incorrects')
  }

  async register({ email, password, firstName, lastName }: RegisterCredentials): Promise<Customer> {
    // Vérifier si l'email existe déjà
    const existingUser = this.mockUsers.find(u => u.email === email)
    
    if (existingUser) {
      throw new Error('Un compte avec cet email existe déjà')
    }

    // Créer un nouvel utilisateur
    const newUser: Customer = {
      id: this.mockUsers.length + 1,
      email,
      firstname: firstName,
      lastname: lastName
    }

    this.mockUsers.push(newUser)
    this.currentUser = newUser

    return newUser
  }

  async logout(): Promise<void> {
    this.currentUser = null
  }

  async getCurrentUser(): Promise<Customer | null> {
    return this.currentUser
  }

  async resetPassword(email: string): Promise<void> {
    const user = this.mockUsers.find(u => u.email === email)
    
    if (!user) {
      throw new Error('Aucun utilisateur trouvé avec cet email')
    }

    // Simulation de réinitialisation de mot de passe
    console.log(`Réinitialisation du mot de passe pour ${email}`)
  }
}

export const mockAuthRepository = new MockAuthRepository()
