import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import productReducer from '../presentation/redux/slices/productSlice'
import cartReducer from '../presentation/redux/slices/cartSlice'
import userReducer from '../presentation/redux/slices/userSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'user']
}

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch