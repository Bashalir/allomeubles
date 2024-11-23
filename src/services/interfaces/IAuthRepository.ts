import { Customer } from '../../types/prestashop'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string
  lastName: string
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<Customer>
  register(credentials: RegisterCredentials): Promise<Customer>
  logout(): Promise<void>
  getCurrentUser(): Promise<Customer | null>
  resetPassword?(email: string): Promise<void>
}
