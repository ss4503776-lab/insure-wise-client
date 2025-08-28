import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import policiesReducer from './policiesSlice';
import claimsReducer from './claimsSlice';
import paymentsReducer from './paymentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    policies: policiesReducer,
    claims: claimsReducer,
    payments: paymentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;