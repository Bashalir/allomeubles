import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled(motion.section)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
`;

const HeroContent = styled.div`
  max-width: 50%;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: var(--color-dark-gray);
  margin-bottom: 1rem;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: var(--color-dark-gray);
  margin-bottom: 2rem;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Allomeuble - Meubles Modernes</title>
        <meta name="description" content="Découvrez des meubles modernes et élégants" />
      </Head>

      <HeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroContent>
          <HeroTitle>Transformez Votre Espace</HeroTitle>
          <HeroDescription>
            Découvrez notre collection de meubles modernes qui allient design, 
            fonctionnalité et élégance pour créer un intérieur unique.
          </HeroDescription>
        </HeroContent>
      </HeroSection>
    </>
  );
}
