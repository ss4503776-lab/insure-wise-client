import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Policy {
  id: string;
  policyNumber: string;
  type: 'auto' | 'home' | 'life' | 'health';
  status: 'active' | 'inactive' | 'pending';
  premium: number;
  coverage: number;
  startDate: string;
  endDate: string;
  customerId: string;
  agentId: string;
  documents: string[];
}

interface PoliciesState {
  policies: Policy[];
  loading: boolean;
  searchTerm: string;
}

const initialState: PoliciesState = {
  policies: [
    {
      id: '1',
      policyNumber: 'AUTO-001',
      type: 'auto',
      status: 'active',
      premium: 1200,
      coverage: 50000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      customerId: 'customer1',
      agentId: 'agent1',
      documents: ['license.pdf', 'registration.pdf']
    },
    {
      id: '2',
      policyNumber: 'HOME-002',
      type: 'home',
      status: 'active',
      premium: 1800,
      coverage: 250000,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      customerId: 'customer1',
      agentId: 'agent1',
      documents: ['deed.pdf']
    },
    {
      id: '3',
      policyNumber: 'LIFE-003',
      type: 'life',
      status: 'pending',
      premium: 800,
      coverage: 100000,
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      customerId: 'customer2',
      agentId: 'agent2',
      documents: ['medical.pdf']
    }
  ],
  loading: false,
  searchTerm: '',
};

const policiesSlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {
    setPolicies: (state, action: PayloadAction<Policy[]>) => {
      state.policies = action.payload;
    },
    addPolicy: (state, action: PayloadAction<Policy>) => {
      state.policies.push(action.payload);
    },
    updatePolicy: (state, action: PayloadAction<Policy>) => {
      const index = state.policies.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.policies[index] = action.payload;
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

export const { setPolicies, addPolicy, updatePolicy, setSearchTerm, setLoading } = policiesSlice.actions;
export default policiesSlice.reducer;