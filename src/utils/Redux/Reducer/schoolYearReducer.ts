import {  IAcademicYear } from "@/interfaces/ISchool";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IYear  {
    years: IAcademicYear[];
    loading: boolean;
    error: string | null;
}

const initialState: IYear = {
    years: [],
    loading: false,
    error: null,
};


const yearSlice=createSlice({
    name:"schoolYear",
    initialState,
    reducers:{
        storeSchoolAcademicYears(state,action:PayloadAction<IAcademicYear[]>){
            state.years=action.payload;
        },
        toggleAcademicLoading(state){
            state.loading=state.loading?false:true;
        },
    }
});


export const { storeSchoolAcademicYears,toggleAcademicLoading} = yearSlice.actions;

export default yearSlice.reducer;


