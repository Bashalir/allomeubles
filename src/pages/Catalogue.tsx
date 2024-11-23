import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { addToCart } from '../presentation/redux/slices/cartSlice'
import { Product } from '../core/entities/Product'

const CatalogueContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
`

const ProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`

const ActionButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`

interface CatalogueProps {
  products: Product[]
}

const Catalogue: React.FC<CatalogueProps> = ({ products }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url
    }))
  }

  return (
    <CatalogueContainer>
      {products.map(product => (
        <ProductCard
          key={product.id}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ProductImage 
            src={product.images?.[0]?.url || ''} 
            alt={product.name} 
          />
          <ProductInfo>
            <h3>{product.name}</h3>
            <p>{product.price.toFixed(2)} €</p>
            <ProductActions>
              <Link to={`/produit/${product.id}`}>
                <ActionButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ backgroundColor: 'var(--color-accent-blue)', color: 'white' }}
                >
                  Détails
                </ActionButton>
              </Link>
              <ActionButton
                onClick={() => handleAddToCart(product)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ backgroundColor: 'var(--color-accent-yellow)' }}
              >
                Ajouter
              </ActionButton>
            </ProductActions>
          </ProductInfo>
        </ProductCard>
      ))}
    </CatalogueContainer>
  )
}

export default Catalogue
