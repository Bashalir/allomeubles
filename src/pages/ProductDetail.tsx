import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RootState, AppDispatch } from '../store'
import { fetchProductById } from '../store/slices/productSlice'
import { addToCart } from '../store/slices/cartSlice'

const ProductContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
`

const ProductImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 15px;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ProductTitle = styled.h1`
  font-size: 2rem;
  color: var(--color-dark-gray);
`

const ProductDescription = styled.p`
  color: var(--color-dark-gray);
  line-height: 1.6;
`

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-accent-blue);
`

const AddToCartButton = styled(motion.button)`
  background-color: var(--color-accent-blue);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken(var(--color-accent-blue), 10%);
  }
`

const ProductFeatures = styled.div`
  margin-top: 1rem;
`

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const dispatch: AppDispatch = useDispatch()
  
  // Sélectionner le produit depuis le state Redux
  const { selectedProduct, status } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    // Dispatcher l'action pour charger le produit
    if (id) {
      dispatch(fetchProductById(Number(id)))
    }
  }, [id, dispatch])

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.images?.[0]?.url || '',
        quantity: 1
      }))
    }
  }

  if (status === 'loading') {
    return <div>Chargement du produit...</div>
  }

  if (!selectedProduct) {
    return <div>Produit non trouvé</div>
  }

  return (
    <ProductContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ProductImage 
        src={selectedProduct.images?.[0]?.url || ''} 
        alt={selectedProduct.name} 
      />
      <ProductInfo>
        <ProductTitle>{selectedProduct.name}</ProductTitle>
        <ProductDescription>{selectedProduct.description}</ProductDescription>
        <ProductPrice>{selectedProduct.price.toFixed(2)} €</ProductPrice>
        
        {selectedProduct.features && selectedProduct.features.length > 0 && (
          <ProductFeatures>
            <h3>Caractéristiques</h3>
            {selectedProduct.features.map((feature, index) => (
              <p key={index}>
                {feature.name}: {feature.value}
              </p>
            ))}
          </ProductFeatures>
        )}
        
        <AddToCartButton 
          onClick={handleAddToCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ajouter au panier
        </AddToCartButton>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductDetail
