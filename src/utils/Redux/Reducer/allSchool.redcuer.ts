import { ISchoolFormData } from "@/interfaces/IRegister";

import { createSlice } from "@reduxjs/toolkit";

interface ISchoolInitState{
    schools:ISchoolFormData[],
    error:string|null,
    loading:boolean
}

const initialState:ISchoolInitState={
    schools:[],
    error:"",
    loading:false
}

const schoolSlice=createSlice({
    name:"schools",

    initialState,

    reducers:{
        storeSchools(state,action){
            state.schools=action.payload;
            state.loading=false;
        },

        toggleSchoolLoading(state){
            state.loading=state.loading?false:true;
        }
    }

});


export const {storeSchools,toggleSchoolLoading}=schoolSlice.actions;

export default schoolSlice.reducer;