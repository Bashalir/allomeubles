import styled from 'styled-components';
import Link from 'next/link';

const LogoContainer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-dark-gray);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.span`
  font-size: 2rem;
  color: var(--color-accent-blue);
`;

export const Logo = () => {
  return (
    <Link href="/" passHref>
      <LogoContainer>
        <LogoIcon>🪑</LogoIcon>
        Allomeuble
      </LogoContainer>
    </Link>
  );
};
