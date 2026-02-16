import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IUser{
    id:string,
    model:string
}

interface ICurrentUser  {
    user:IUser|null;
    loading: boolean;
    error: string | null;
}

const initialSubState: ICurrentUser = {
    user:null,
    loading: false,
    error: null,
};


const currentUserSlice=createSlice({
    name:"currentUser",
    initialState:initialSubState,
    reducers:{
        storeCurrentUser(state,action:PayloadAction<ICurrentUser>){
            state.user=action.payload.user;
        },

        toggleCurrentUserLoading(){},
    }
});


export const { storeCurrentUser,toggleCurrentUserLoading} = currentUserSlice.actions;

export default currentUserSlice.reducer;


