import { IAddress, IDocument, ISchoolFormData } from "@/interfaces/IRegister";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface ISubjectReducer  {
    meta: ISchoolFormData|null;
    documents:IDocument|null;
    address: IAddress|null;    
    loading: boolean;
    error: string | null;
}

const initialState: ISubjectReducer = {
    meta: null,
    documents:null,
    address:null,
    loading: false,
    error: null,
};


const schoolMDA_Reducer=createSlice({
    name:"schoolMDA",
    initialState,
    reducers:{
        setSchool_MDA_Data(state,action:PayloadAction<ISubjectReducer>){
            const {meta,address,documents}=action.payload;
            state.meta=meta;
            state.documents=documents; 
            state.address=address;
        },
        toggleMDALoading(state){
            state.loading=state.loading?false:true;
        },
    }
});


export const {setSchool_MDA_Data,toggleMDALoading} = schoolMDA_Reducer.actions;

export default schoolMDA_Reducer.reducer;

