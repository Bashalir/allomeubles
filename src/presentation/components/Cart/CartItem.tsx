import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CartItem as CartItemType } from '../../../core/entities/Cart'

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ItemImage = styled.img`
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

const QuantityButton = styled(motion.button)`
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

interface CartItemProps {
  item: CartItemType
  onIncrement: (itemId: number) => void
  onDecrement: (itemId: number) => void
}

export const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement
}) => {
  return (
    <ItemContainer>
      <ItemDetails>
        {item.image && (
          <ItemImage 
            src={item.image} 
            alt={item.name} 
          />
        )}
        <div>
          <h3>{item.name}</h3>
          <p>{item.price.toFixed(2)} €</p>
        </div>
      </ItemDetails>
      
      <QuantityControl>
        <QuantityButton
          onClick={() => onDecrement(item.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          -
        </QuantityButton>
        <span>{item.quantity}</span>
        <QuantityButton
          onClick={() => onIncrement(item.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          +
        </QuantityButton>
      </QuantityControl>
      
      <div>{(item.price * item.quantity).toFixed(2)} €</div>
    </ItemContainer>
  )
}
