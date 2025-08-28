import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  status: 'pending' | 'approved' | 'denied' | 'processing';
  amount: number;
  description: string;
  dateSubmitted: string;
  customerId: string;
  documents: string[];
}

interface ClaimsState {
  claims: Claim[];
  loading: boolean;
  searchTerm: string;
}

const initialState: ClaimsState = {
  claims: [
    {
      id: '1',
      claimNumber: 'CLM-001',
      policyId: '1',
      status: 'processing',
      amount: 2500,
      description: 'Minor vehicle accident - bumper damage',
      dateSubmitted: '2024-02-15',
      customerId: 'customer1',
      documents: ['accident_report.pdf', 'photos.zip']
    },
    {
      id: '2',
      claimNumber: 'CLM-002',
      policyId: '2',
      status: 'approved',
      amount: 5000,
      description: 'Water damage from storm',
      dateSubmitted: '2024-01-20',
      customerId: 'customer1',
      documents: ['damage_assessment.pdf']
    },
    {
      id: '3',
      claimNumber: 'CLM-003',
      policyId: '3',
      status: 'pending',
      amount: 1500,
      description: 'Medical expenses',
      dateSubmitted: '2024-03-01',
      customerId: 'customer2',
      documents: ['medical_bills.pdf']
    }
  ],
  loading: false,
  searchTerm: '',
};

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    setClaims: (state, action: PayloadAction<Claim[]>) => {
      state.claims = action.payload;
    },
    addClaim: (state, action: PayloadAction<Claim>) => {
      state.claims.push(action.payload);
    },
    updateClaim: (state, action: PayloadAction<Claim>) => {
      const index = state.claims.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.claims[index] = action.payload;
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setClaims, addClaim, updateClaim, setSearchTerm, setLoading } = claimsSlice.actions;
export default claimsSlice.reducer;