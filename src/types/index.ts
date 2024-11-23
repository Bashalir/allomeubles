// Types génériques pour l'application
export interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category?: string
  reference?: string
  stock?: number
}

export interface User {
  id: number
  email: string
  firstName?: string
  lastName?: string
  token?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}
