import { IBatches } from "@/interfaces/ISchool";
import { createSlice } from "@reduxjs/toolkit";

interface BatchInterface{
    batches:IBatches[],
    error:string|null,
    loading:boolean
}

const initialState:BatchInterface={
    batches:[],
    error:"",
    loading:false
}

const batchSlice=createSlice({
    name:"batches",

    initialState,

    reducers:{
        storeBatches(state,action){
            state.batches=action.payload;
            state.loading=false;
        },

        toggleBatchLoading(state){
            state.loading=state.loading?false:true;
        }
    }

});


export const {storeBatches,toggleBatchLoading}=batchSlice.actions;

export default batchSlice.reducer;