import { IAcademicCourse, IAcademicCourseMeta,  } from "@/interfaces/ISchool";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISubjectReducer  {
    courses: IAcademicCourse[];
    courses_meta: IAcademicCourseMeta[];
    loading: boolean;
    error: string | null;
}

const initialSubState: ISubjectReducer = {
    courses: [],
    courses_meta:[],
    loading: false,
    error: null,
};


const courseSlice=createSlice({
    name:"schoolCourses",
    initialState:initialSubState,
    reducers:{
        storeSchoolAcademicCourses(state,action:PayloadAction<IAcademicCourse[]>){
            state.courses=action.payload;
        },
        storeSchoolAcademicCoursesMeta(state,action:PayloadAction<IAcademicCourseMeta[]>){
            state.courses_meta=action.payload;
        },
        toggleAcademicCourseLoading(state){
            state.loading=state.loading?false:true;
        },
    }
});


export const { storeSchoolAcademicCourses,storeSchoolAcademicCoursesMeta,toggleAcademicCourseLoading} = courseSlice.actions;

export default courseSlice.reducer;