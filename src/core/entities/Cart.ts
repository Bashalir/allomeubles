export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface CartOperations {
  addItem(item: CartItem): void
  removeItem(itemId: number): void
  clear(): void
  updateTotals(): void
}
