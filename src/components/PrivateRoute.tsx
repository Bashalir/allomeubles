import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

interface PrivateRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requireAuth = false 
}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Si requireAuth est false, toujours afficher le contenu
  if (!requireAuth) {
    return <>{children}</>
  }

  // Si requireAuth est true, vérifier l'authentification
  return isAuthenticated ? <>{children}</> : <Navigate to="/connexion" replace />
}

export default PrivateRoute
