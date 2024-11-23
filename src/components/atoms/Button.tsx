import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const Button = styled(motion.button)<ButtonProps>`
  padding: ${props => 
    props.size === 'small' ? '0.5rem 1rem' :
    props.size === 'large' ? '1rem 2rem' : 
    '0.75rem 1.5rem'};
  
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  background-color: ${props => 
    props.variant === 'primary' ? 'var(--color-accent-blue)' :
    props.variant === 'secondary' ? 'var(--color-accent-yellow)' : 
    'transparent'};

  color: ${props => 
    props.variant === 'outline' ? 'var(--color-dark-gray)' : 
    'var(--color-white)'};

  border: ${props => 
    props.variant === 'outline' ? '2px solid var(--color-dark-gray)' : 'none'};

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};
