
import { INotification } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISubjectReducer  {
    notifications: INotification[];
    loading: boolean;
    error: string | null;
}

const initialSubState: ISubjectReducer = {
    notifications: [],
    loading: false,
    error: null,
};


const courseSlice=createSlice({
    name:"notifications",
    initialState:initialSubState,
    reducers:{
        storeNotification(state,action:PayloadAction<INotification[]>){
            state.notifications=action.payload;
        },

        toggleNotificationStoreLoading(state){
            state.loading=state.loading?false:true;
        },
    }
});


export const { storeNotification,toggleNotificationStoreLoading} = courseSlice.actions;

export default courseSlice.reducer;