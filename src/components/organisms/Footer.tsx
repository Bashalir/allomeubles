import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
`

const FooterSection = styled.div`
  h4 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--color-dark-gray);
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  a {
    color: var(--color-dark-gray);
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-accent-blue);
    }
  }
`

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <h4>Allomeuble</h4>
        <p>Transformez votre intérieur avec style</p>
      </FooterSection>

      <FooterSection>
        <h4>Navigation</h4>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/catalogue">Catalogue</Link></li>
          <li><Link to="/promotions">Promotions</Link></li>
        </ul>
      </FooterSection>

      <FooterSection>
        <h4>Service Client</h4>
        <ul>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/livraison">Livraison</Link></li>
          <li><Link to="/retours">Retours</Link></li>
        </ul>
      </FooterSection>

      <FooterSection>
        <h4>Légal</h4>
        <ul>
          <li><Link to="/cgv">CGV</Link></li>
          <li><Link to="/confidentialite">Confidentialité</Link></li>
          <li><Link to="/mentions-legales">Mentions Légales</Link></li>
        </ul>
      </FooterSection>
    </FooterContainer>
  )
}

export default Footer
