import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'

export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async registerUser(userData: Omit<User, 'id'>): Promise<User> {
    // Validate user data
    this.validateUserData(userData)

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    // Create user
    return this.userRepository.create(userData)
  }

  async authenticateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)
    
    if (!user) {
      throw new Error('User not found')
    }

    // In a real app, you'd compare hashed passwords
    if (user.password !== password) {
      throw new Error('Invalid credentials')
    }

    return user
  }

  private validateUserData(userData: Omit<User, 'id'>): void {
    if (!userData.email || !userData.email.includes('@')) {
      throw new Error('Invalid email')
    }

    if (!userData.firstName || !userData.lastName) {
      throw new Error('First and last name are required')
    }

    if (!userData.password || userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
  }
}
