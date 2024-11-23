import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const HomeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: calc(100vh - 200px);
`

const HomeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--color-dark-gray);
`

const HomeSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--color-accent-blue);
`

const Home: React.FC = () => {
  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HomeTitle>Bienvenue sur Allomeuble</HomeTitle>
      <HomeSubtitle>
        Découvrez notre collection de meubles design
      </HomeSubtitle>
    </HomeContainer>
  )
}

export default Home
