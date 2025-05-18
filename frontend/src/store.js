import {configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice'
import storage from 'redux-persist/lib/storage'
import { apiSlice } from './slices/apiSlice';

// Persist config for auth only
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['userInfo'] // Only persist userInfo from auth slice
  };
  
  const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
  
  const store = configureStore({
    reducer: {
      auth: persistedAuthReducer,
      [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE','persist/PURGE'],
        },
      }).concat(apiSlice.middleware),
    devTools: true
  });
  
  export const persistor = persistStore(store);
  export default store;