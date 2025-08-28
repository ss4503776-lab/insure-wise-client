import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import policiesReducer from './policiesSlice.js';
import claimsReducer from './claimsSlice.js';
import paymentsReducer from './paymentsSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    policies: policiesReducer,
    claims: claimsReducer,
    payments: paymentsReducer,
  },
});