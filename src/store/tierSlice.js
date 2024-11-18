import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
// import api from '../api';

export const fetchTiers = createAsyncThunk('tier/fetchTiers', async () => {
  const response = await api.get('/tiers');
  return response.data;
});

export const addTier = createAsyncThunk('tier/addTier', async (tier) => {
  const response = await api.post('/tiers', tier);
  return response.data;
});

export const updateTier = createAsyncThunk('tier/updateTier', async ({ id, tier }) => {
  const response = await api.put(`/tiers/${id}`, tier);
  return response.data;
});

export const deleteTier = createAsyncThunk('tier/deleteTier', async (id) => {
  await api.delete(`/tiers/${id}`);
  return id;
});

const tierSlice = createSlice({
  name: 'tier',
  initialState: { tiers: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTiers.pending, (state) => { state.loading = true; })
      .addCase(fetchTiers.fulfilled, (state, action) => {
        state.tiers = action.payload;
        state.loading = false;
      })
      .addCase(fetchTiers.rejected, (state) => { state.loading = false; })
      .addCase(addTier.fulfilled, (state, action) => {
        state.tiers.push(action.payload);
      })
      .addCase(updateTier.fulfilled, (state, action) => {
        const index = state.tiers.findIndex((tier) => tier.id === action.payload.id);
        if (index >= 0) state.tiers[index] = action.payload;
      })
      .addCase(deleteTier.fulfilled, (state, action) => {
        state.tiers = state.tiers.filter((tier) => tier.id !== action.payload);
      });
  },
});

export default tierSlice.reducer;
