import { IAcademicSubject } from "@/interfaces/ISchool";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISubjectReducer  {
    subjects: IAcademicSubject[];
    loading: boolean;
    error: string | null;
}

const initialSubState: ISubjectReducer = {
    subjects: [],
    loading: false,
    error: null,
};


const subjectSlice=createSlice({
    name:"schoolSubject",
    initialState:initialSubState,
    reducers:{
        storeSchoolAcademicSubjects(state,action:PayloadAction<IAcademicSubject[]>){
            state.subjects=action.payload;
        },
        toggleAcademicSubLoading(state,action){
            state.loading=action.payload;
        },
    }
});


export const { storeSchoolAcademicSubjects,toggleAcademicSubLoading} = subjectSlice.actions;

export default subjectSlice.reducer;