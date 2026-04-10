import { IPlan } from '@/interfaces/IPlan';
import { createSlice } from '@reduxjs/toolkit';

interface IPlanReducer {
    plans: IPlan[],
    loading: false,
}

const initialState:IPlanReducer = {
    plans: [],
    loading: false,
};

const schoolSlice = createSlice({
    name: 'subscriptionPlans',
    initialState,
    reducers: {
        setPlans: (state, action) => {
        state.plans = action.payload;
        },

        togglePlansLoading: (state, action) => {
        state.loading = action.payload;
        },
    }
});

export const { setPlans,togglePlansLoading } = schoolSlice.actions;

export default schoolSlice.reducer;
