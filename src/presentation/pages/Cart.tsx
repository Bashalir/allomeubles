import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RootState } from '../../store'
import { addToCart, removeFromCart, clearCart } from '../redux/slices/cartSlice'
import { CartItemComponent } from '../components/Cart/CartItem'
import { CartSummary } from '../components/Cart/CartSummary'

const CartContainer = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
`

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--color-dark-gray);
`

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const handleIncrement = (itemId: number) => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      dispatch(addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      }))
    }
  }

  const handleDecrement = (itemId: number) => {
    dispatch(removeFromCart(itemId))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCheckout = () => {
    // TODO: Implémenter la logique de commande
    console.log('Checkout')
  }

  if (totalItems === 0) {
    return (
      <EmptyCartMessage>
        Votre panier est vide. 
        <Link to="/catalogue">Continuer mes achats</Link>
      </EmptyCartMessage>
    )
  }

  return (
    <CartContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Votre Panier ({totalItems} articles)</h1>
      
      {items.map(item => (
        <CartItemComponent
          key={item.id}
          item={item}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      ))}
      
      <CartSummary
        totalPrice={totalPrice}
        onClear={handleClearCart}
        onCheckout={handleCheckout}
      />
    </CartContainer>
  )
}

export default Cart
