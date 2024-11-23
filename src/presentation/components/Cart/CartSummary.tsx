import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const SummaryContainer = styled.div`
  margin-top: 2rem;
  text-align: right;
`

const ActionButton = styled(motion.button)`
  background-color: var(--color-accent-blue);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  margin-left: 1rem;
  cursor: pointer;
`

interface CartSummaryProps {
  totalPrice: number
  onClear: () => void
  onCheckout: () => void
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totalPrice,
  onClear,
  onCheckout
}) => {
  return (
    <SummaryContainer>
      <h2>Total: {totalPrice.toFixed(2)} €</h2>
      <ActionButton 
        onClick={onClear}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Vider le panier
      </ActionButton>
      <ActionButton 
        onClick={onCheckout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Passer la commande
      </ActionButton>
    </SummaryContainer>
  )
}
