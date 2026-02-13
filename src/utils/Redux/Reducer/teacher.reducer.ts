
import { IGetAllTeachers, ITeacher, ITeacherBio } from "@/interfaces/ITeacher";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITeacherReducer  {
    bio: ITeacherBio[];
    professional: ITeacher[];
    loading: boolean;
    error: string | null;
}

const initialSubState: ITeacherReducer = {
    bio: [],
    professional: [],
    loading: false,
    error: null,
};


const teacherSlice=createSlice({
    name:"teacher",
    initialState:initialSubState,
    reducers:{
        storeTeachers(state,action:PayloadAction<IGetAllTeachers>){
            state.bio=action.payload.teacherBio;
            state.professional=action.payload.teachersSchoolData;
        },
        toggleTeachersAdding(state){
            state.loading=state.loading?false:true;
        },
    }
});


export const { storeTeachers,toggleTeachersAdding} = teacherSlice.actions;

export default teacherSlice.reducer;


