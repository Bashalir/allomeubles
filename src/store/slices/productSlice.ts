import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockProductRepository } from '../../services/repositories/MockProductRepository'
import { Product, Category, ApiResponse } from '../../types/prestashop'

// Async thunk pour charger les produits
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params?: { 
    limit?: number, 
    page?: number, 
    categoryId?: number 
  }) => {
    const response: ApiResponse<Product[]> = await mockProductRepository.getAll(params)
    return response.data
  }
)

// Async thunk pour charger un produit par ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const response: ApiResponse<Product> = await mockProductRepository.getById(id)
    return response.data
  }
)

// Async thunk pour charger les catégories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (params?: { 
    limit?: number, 
    page?: number 
  }) => {
    const response: ApiResponse<Category[]> = await mockProductRepository.getCategories(params)
    return response.data
  }
)

interface ProductState {
  products: Product[]
  categories: Category[]
  selectedProduct: Product | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
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

      // Gestion du chargement des catégories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Erreur de chargement des catégories'
      })
  }
})

export default productSlice.reducer
