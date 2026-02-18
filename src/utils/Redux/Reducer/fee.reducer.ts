import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFee } from "@/interfaces/IFee";

interface IRFee  {
    fees:IFee[]|null;
    loading: boolean;
    error: string | null;
}

const initialSubState:IRFee = {
    fees:null,
    loading: false,
    error: null,
};


const feeSlice=createSlice({
    name:"fee",
    initialState:initialSubState,
    reducers:{
        storeFees(state,action:PayloadAction<IFee[]>){
            state.fees=action.payload;
        },

        toggleFeeLoading(state,action:PayloadAction<boolean>){
            state.loading=action.payload;
        },
    }
});


export const { storeFees,toggleFeeLoading} = feeSlice.actions;

export default feeSlice.reducer;


