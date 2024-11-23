import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { MockUserRepository } from '../../../infrastructure/repositories/MockUserRepository'
import { UserUseCases } from '../../../core/usecases/UserUseCases'
import { User } from '../../../core/entities/User'

// Créer les use cases
const userRepository = new MockUserRepository()
const userUseCases = new UserUseCases(userRepository)

// Async thunk pour l'inscription
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: Omit<User, 'id'>) => {
    return userUseCases.registerUser(userData)
  }
)

// Async thunk pour l'authentification
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string, password: string }) => {
    return userUseCases.authenticateUser(email, password)
  }
)

interface UserState {
  user: User | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null
  } as UserState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion de l'inscription
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Erreur lors de l\'inscription'
      })

      // Gestion de la connexion
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Erreur de connexion'
      })
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
