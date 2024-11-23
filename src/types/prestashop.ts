// Types détaillés pour PrestaShop
export interface Product {
  id: number
  name: string
  description: string
  price: number
  reference: string
  category: string
  stock?: number
  images?: {
    id: number
    url: string
  }[]
  features?: {
    name: string
    value: string
  }[]
}

export interface Category {
  id: number
  name: string
  description?: string
}

export interface ProductFeature {
  id: number
  name: string
  values: ProductFeatureValue[]
}

export interface ProductFeatureValue {
  id: number
  feature_id: number
  value: string
}

export interface ProductOption {
  id: number
  name: string
  values: ProductOptionValue[]
}

export interface ProductOptionValue {
  id: number
  option_id: number
  value: string
}

export interface Customer {
  id?: number
  email: string
  firstname: string
  lastname: string
  passwd?: string
}

export interface Order {
  id: number
  reference: string
  total_paid: number
  current_state: number
  date_add: string
  customer_id: number
}

export interface Address {
  id?: number
  alias: string
  firstname: string
  lastname: string
  address1: string
  address2?: string
  postcode: string
  city: string
  country_id: number
}

export interface Carrier {
  id: number
  name: string
  delay: string
}

export interface Language {
  id: number
  name: string
  iso_code: string
}

export interface Country {
  id: number
  name: string
  iso_code: string
}

export interface Currency {
  id: number
  name: string
  iso_code: string
  sign: string
}

// Type générique pour les réponses API
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}
