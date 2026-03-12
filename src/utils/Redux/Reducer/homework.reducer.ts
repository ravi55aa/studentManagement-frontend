import { IHomework } from '@/interfaces/IHomework'; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IHomeworkReducer {
    homeworks: IHomework[];
    loading: boolean;
    error: string | null;
}

const initialSubState: IHomeworkReducer = {
    homeworks: [],
    loading: false,
    error: null,
};

const courseSlice = createSlice({
    name: 'homeworks',
    initialState: initialSubState,
    reducers: {
        storeHomeworks(state, action: PayloadAction<IHomework[]>) {
        state.homeworks = action.payload;
        },
        
        toggleHomeworkLoading(state, action) {
        state.loading = action.payload;
        },
    },
});

export const {
    storeHomeworks,
    toggleHomeworkLoading,
} = courseSlice.actions;

export default courseSlice.reducer;
