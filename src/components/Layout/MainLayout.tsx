import React from 'react'
import styled from 'styled-components'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem;
`

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutContainer>
  )
}

export default MainLayout
