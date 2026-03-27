import { IHomeworkSubmission } from '@/interfaces/IHomework'; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IHomeworkReducer {
    studentsHomeworks: IHomeworkSubmission[];
    loading: boolean;
    error: string | null;
}

const initialSubState: IHomeworkReducer = {
    studentsHomeworks: [],
    loading: false,
    error: null,
};

const studentHomeworkSlice = createSlice({
    name: 'studentsHomework',
    initialState: initialSubState,
    reducers: {
        storeStudentsHomeworks(state, action: PayloadAction<IHomeworkSubmission[]>) {
        state.studentsHomeworks = action.payload;
        },
        
        toggleStudentsHomeworkLoading(state, action) {
        state.loading = action.payload;
        },
    },
});

export const {
    storeStudentsHomeworks,
    toggleStudentsHomeworkLoading,
} = studentHomeworkSlice.actions;

export default studentHomeworkSlice.reducer;