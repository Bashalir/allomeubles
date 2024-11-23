import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RootState } from '../../store'

const NavContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const NavLink = styled(Link)`
  color: var(--color-dark-gray);
  font-weight: 500;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--color-accent-blue);
  }
`

const CartBadge = styled.span`
  background-color: var(--color-accent-blue);
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`

const Navbar: React.FC = () => {
  const { totalItems } = useSelector((state: RootState) => state.cart)

  return (
    <NavContainer
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/">Allomeuble</Link>
      <NavLinks>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/catalogue">Catalogue</NavLink>
        <NavLink to="/panier">
          Panier 
          {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
        </NavLink>
      </NavLinks>
    </NavContainer>
  )
}

export default Navbar
