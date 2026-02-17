import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IUser{
    id:string,
    role:string
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
        storeCurrentUser(state,action:PayloadAction<IUser>){
            state.user=action.payload;
        },

        toggleCurrentUserLoading(){},
    }
});


export const { storeCurrentUser,toggleCurrentUserLoading} = currentUserSlice.actions;

export default currentUserSlice.reducer;


