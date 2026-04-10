import { ISchoolFormData } from '@/interfaces/IRegister';
import { createSlice } from '@reduxjs/toolkit';

interface ISchools {
    schools: ISchoolFormData[],
    loading: false,
}

const initialState:ISchools = {
    schools: [],
    loading: false,
};

const schoolSlice = createSlice({
    name: 'school',
    initialState,
    reducers: {
        setSchools: (state, action) => {
        state.schools = action.payload;
        },
        toggleSchoolLoading: (state, action) => {
        state.loading = action.payload;
        },
        updateSchoolStatusLocal: (state, action) => {
        const { id, status } = action.payload;
        const school = state.schools.find(s => s._id === id);
        if (school) school.status = status;
        }
    }
});

export const { setSchools,toggleSchoolLoading,updateSchoolStatusLocal } = schoolSlice.actions;

export default schoolSlice.reducer;
