import { ICenter } from "@/interfaces/ICenter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CenterState  {
    centers: ICenter[];
    loading: boolean;
    error: string | null;
}

const initialState: CenterState = {
    centers: [],
    loading: false,
    error: null,
};


const centerSlice=createSlice({
    name:"center",
    initialState,
    reducers:{
        setCenters(state,action:PayloadAction<ICenter[]>){
            state.centers=action.payload;
        },
        toggleCenterLoading(state){
            state.loading=state.loading?false:true;
        },
    }
});


export const { setCenters,toggleCenterLoading} = centerSlice.actions;

export default centerSlice.reducer;
