export interface ProductImage {
  id: number
  url: string
}

export interface ProductFeature {
  name: string
  value: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  reference: string
  category: string
  stock?: number
  images?: ProductImage[]
  features?: ProductFeature[]
}

export interface ProductFilter {
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  searchTerm?: string
}
