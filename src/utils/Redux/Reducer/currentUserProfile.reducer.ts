import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserProfile {
    id: string;
    role: string;
    profile:string;
    name:string;
    email:string;
}

export interface ICurrentUser {
    user: IUserProfile | null;
    loading: boolean;
    error: string | null;
}

const initialSubState: ICurrentUser = {
    user: null,
    loading: false,
    error: null,
};

const currentUserSlice = createSlice({
    name: 'currentUserProfile',
    initialState: initialSubState,
    reducers: {
        storeCurrentUserProfile(state, action: PayloadAction<IUserProfile>) {
        state.user = action.payload;
        },

        toggleCurrentUserProfileLoading() {},
    },
});

export const { storeCurrentUserProfile, toggleCurrentUserProfileLoading } = currentUserSlice.actions;

export default currentUserSlice.reducer;
