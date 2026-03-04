import { IBatches } from '@/interfaces/ISchool';
import { createSlice } from '@reduxjs/toolkit';

interface BatchInterface {
  batches: IBatches[];
  error: string | null;
  loading: boolean;
}

const initialState: BatchInterface = {
  batches: [],
  error: '',
  loading: false,
};

const batchSlice = createSlice({
  name: 'batches',

  initialState,

  reducers: {
    storeBatches(state, action) {
      state.batches = action.payload;
      state.loading = false;
    },

    toggleBatchLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { storeBatches, toggleBatchLoading } = batchSlice.actions;

export default batchSlice.reducer;
