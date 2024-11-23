import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './store'
import { fetchProducts } from './store/slices/productSlice'
import { getCurrentUser } from './store/slices/authSlice'

import MainLayout from './components/Layout/MainLayout'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import PrivateRoute from './components/PrivateRoute'

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { status: productStatus } = useSelector((state: RootState) => state.products)
  const { status: authStatus } = useSelector((state: RootState) => state.auth)

  React.useEffect(() => {
    // Charger les produits et l'utilisateur initial
    if (productStatus === 'idle') {
      dispatch(fetchProducts())
    }

    // Tenter de récupérer l'utilisateur courant
    dispatch(getCurrentUser())
  }, [dispatch, productStatus])

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/produit/:id" element={<ProductDetail />} />
        <Route 
          path="/panier" 
          element={
            <PrivateRoute requireAuth={false}>
              <Cart />
            </PrivateRoute>
          } 
        />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
      </Routes>
    </MainLayout>
  )
}

export default App
