import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/AuthService'
import { Customer } from '../../types/prestashop'

// Async thunks pour les actions d'authentification
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string, password: string }) => {
    const user = await authService.login({ email, password })
    return user
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async ({ 
    email, 
    password, 
    firstName, 
    lastName 
  }: { 
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string 
  }) => {
    const user = await authService.register({ 
      email, 
      password, 
      firstName, 
      lastName 
    })
    return user
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout()
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    const user = await authService.getCurrentUser()
    return user
  }
)

interface AuthState {
  user: Customer | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    // Gestion de la connexion
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Échec de la connexion'
        state.isAuthenticated = false
      })

    // Gestion de l'inscription  
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Échec de l\'inscription'
        state.isAuthenticated = false
      })

    // Gestion de la déconnexion
    builder
      .addCase(logout.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded'
        state.user = null
        state.isAuthenticated = false
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Échec de la déconnexion'
      })

    // Gestion de la récupération de l'utilisateur courant  
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isAuthenticated = !!action.payload
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Impossible de récupérer l\'utilisateur'
        state.isAuthenticated = false
      })
  }
})

export default authSlice.reducer
