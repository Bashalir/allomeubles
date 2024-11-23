import { User } from '../entities/User'

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  create(user: Omit<User, 'id'>): Promise<User>
  update(id: number, user: Partial<User>): Promise<User>
}
