import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

//2.) dodat ga ovdje u reducere, store.js je već postojeći file
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
