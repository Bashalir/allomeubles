import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { MockProductRepository } from '../../../infrastructure/repositories/MockProductRepository'
import { ProductUseCases } from '../../../core/usecases/ProductUseCases'
import { Product, ProductFilter } from '../../../core/entities/Product'

// Créer les use cases
const productRepository = new MockProductRepository()
const productUseCases = new ProductUseCases(productRepository)

// Async thunk pour charger les produits
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filter?: ProductFilter) => {
    return productUseCases.getAllProducts(filter)
  }
)

// Async thunk pour charger un produit par ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    return productUseCases.getProductById(id)
  }
)

interface ProductState {
  products: Product[]
  selectedProduct: Product | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    selectedProduct: null,
    status: 'idle',
    error: null
  } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestion du chargement des produits
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Erreur de chargement des produits'
      })
      
      // Gestion du chargement d'un produit spécifique
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Erreur de chargement du produit'
      })
  }
})

export default productSlice.reducer
