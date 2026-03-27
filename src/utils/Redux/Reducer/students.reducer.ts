import { IStudent } from '@/interfaces/IStudent';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStudentsReducer {
    students: IStudent[];
    loading: boolean;
    error: string | null;
}

const initialSubState: IStudentsReducer = {
    students: [],
    loading: false,
    error: null,
};

const studentsSlice = createSlice({
    name: 'students',
    initialState: initialSubState,
    reducers: {
        storeStudents(state, action: PayloadAction<IStudent[]>) {
        state.students = action.payload;
        },
        
        toggleStudentsLoading(state, action) {
        state.loading = action.payload;
        },
    },
});

export const {
    storeStudents,toggleStudentsLoading
} = studentsSlice.actions;

export default studentsSlice.reducer;