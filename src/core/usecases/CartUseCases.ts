import { Cart, CartItem } from '../entities/Cart'

export class CartUseCases {
  private calculateTotals(items: CartItem[]): { totalItems: number; totalPrice: number } {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0)
    
    return { totalItems, totalPrice }
  }

  addItemToCart(currentCart: Cart, newItem: Omit<CartItem, 'quantity'>): Cart {
    const updatedItems = [...currentCart.items]
    const existingItemIndex = updatedItems.findIndex(item => item.id === newItem.id)

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      }
    } else {
      updatedItems.push({ ...newItem, quantity: 1 })
    }

    const { totalItems, totalPrice } = this.calculateTotals(updatedItems)

    return {
      items: updatedItems,
      totalItems,
      totalPrice
    }
  }

  removeItemFromCart(currentCart: Cart, itemId: number): Cart {
    const updatedItems = [...currentCart.items]
    const itemIndex = updatedItems.findIndex(item => item.id === itemId)

    if (itemIndex !== -1) {
      if (updatedItems[itemIndex].quantity > 1) {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity - 1
        }
      } else {
        updatedItems.splice(itemIndex, 1)
      }
    }

    const { totalItems, totalPrice } = this.calculateTotals(updatedItems)

    return {
      items: updatedItems,
      totalItems,
      totalPrice
    }
  }

  clearCart(): Cart {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0
    }
  }
}
