import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NavList = styled(motion.ul)`
  display: flex;
  list-style: none;
  gap: 1.5rem;
`;

const NavItem = styled(motion.li)`
  a {
    text-decoration: none;
    color: var(--color-dark-gray);
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-accent-blue);
    }
  }
`;

export const NavigationMenu = () => {
  const menuItems = [
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/nouveautes', label: 'Nouveautés' },
    { href: '/promotions', label: 'Promotions' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <NavList 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {menuItems.map((item) => (
        <NavItem
          key={item.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={item.href}>
            {item.label}
          </Link>
        </NavItem>
      ))}
    </NavList>
  );
};
