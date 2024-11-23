import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart, CartItem } from '../../../core/entities/Cart'
import { CartUseCases } from '../../../core/usecases/CartUseCases'

const cartUseCases = new CartUseCases()

const initialState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const updatedCart = cartUseCases.addItemToCart(state, action.payload)
      state.items = updatedCart.items
      state.totalItems = updatedCart.totalItems
      state.totalPrice = updatedCart.totalPrice
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const updatedCart = cartUseCases.removeItemFromCart(state, action.payload)
      state.items = updatedCart.items
      state.totalItems = updatedCart.totalItems
      state.totalPrice = updatedCart.totalPrice
    },
    clearCart: (state) => {
      const emptyCart = cartUseCases.clearCart()
      state.items = emptyCart.items
      state.totalItems = emptyCart.totalItems
      state.totalPrice = emptyCart.totalPrice
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
