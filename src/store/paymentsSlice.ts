import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Payment {
  id: string;
  policyId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: 'credit_card' | 'bank_transfer' | 'check';
  date: string;
  customerId: string;
  description: string;
}

interface PaymentsState {
  payments: Payment[];
  loading: boolean;
}

const initialState: PaymentsState = {
  payments: [
    {
      id: '1',
      policyId: '1',
      amount: 100,
      status: 'completed',
      method: 'credit_card',
      date: '2024-02-01',
      customerId: 'customer1',
      description: 'Monthly premium payment'
    },
    {
      id: '2',
      policyId: '2',
      amount: 150,
      status: 'completed',
      method: 'bank_transfer',
      date: '2024-02-01',
      customerId: 'customer1',
      description: 'Monthly premium payment'
    },
    {
      id: '3',
      policyId: '1',
      amount: 100,
      status: 'pending',
      method: 'credit_card',
      date: '2024-03-01',
      customerId: 'customer1',
      description: 'Monthly premium payment'
    }
  ],
  loading: false,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.payments = action.payload;
    },
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.payments.push(action.payload);
    },
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.payments.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.payments[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setPayments, addPayment, updatePayment, setLoading } = paymentsSlice.actions;
export default paymentsSlice.reducer;