import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RootState } from '../store'
import { removeFromCart, clearCart, addToCart } from '../presentation/redux/slices/cartSlice'

const CartContainer = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
`

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`

const CartItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const QuantityButton = styled.button`
  background-color: var(--color-accent-blue);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const CartSummary = styled.div`
  margin-top: 2rem;
  text-align: right;
`

const CartButton = styled(motion.button)`
  background-color: var(--color-accent-blue);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  margin-left: 1rem;
  cursor: pointer;
`

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--color-dark-gray);
`

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId))
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
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
        <CartItem key={item.id}>
          <CartItemDetails>
            {item.image && (
              <CartItemImage 
                src={item.image} 
                alt={item.name} 
              />
            )}
            <div>
              <h3>{item.name}</h3>
              <p>{item.price.toFixed(2)} €</p>
            </div>
          </CartItemDetails>
          
          <QuantityControl>
            <QuantityButton onClick={() => handleRemoveFromCart(item.id)}>-</QuantityButton>
            <span>{item.quantity}</span>
            <QuantityButton onClick={() => handleAddToCart(item)}>+</QuantityButton>
          </QuantityControl>
          
          <div>{(item.price * item.quantity).toFixed(2)} €</div>
        </CartItem>
      ))}
      
      <CartSummary>
        <h2>Total: {totalPrice.toFixed(2)} €</h2>
        <CartButton 
          onClick={handleClearCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Vider le panier
        </CartButton>
        <CartButton 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Passer la commande
        </CartButton>
      </CartSummary>
    </CartContainer>
  )
}

export default Cart
