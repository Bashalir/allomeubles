import { UserRepository } from '../../core/repositories/UserRepository'
import { User } from '../../core/entities/User'

export class MockUserRepository implements UserRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123'
    }
  ]

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: this.users.length + 1
    }
    this.users.push(newUser)
    return newUser
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const index = this.users.findIndex(user => user.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }

    this.users[index] = {
      ...this.users[index],
      ...userData
    }

    return this.users[index]
  }
}
