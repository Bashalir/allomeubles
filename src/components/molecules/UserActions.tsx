import React from 'react';
import { Button } from '../atoms/Button';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const UserActionsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserActions: React.FC = () => {
  const handleLogin = () => {
    // Future login logic
    console.log('Login clicked');
  };

  const handleSignup = () => {
    // Future signup logic
    console.log('Signup clicked');
  };

  return (
    <UserActionsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Button 
        variant="outline" 
        size="small" 
        onClick={handleLogin}
      >
        Connexion
      </Button>
      <Button 
        variant="primary" 
        size="small" 
        onClick={handleSignup}
      >
        Inscription
      </Button>
    </UserActionsContainer>
  );
};

export default UserActions;
