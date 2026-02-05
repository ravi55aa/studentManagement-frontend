import { createSlice } from "@reduxjs/toolkit";
import { IAddress } from "@/interfaces/IRegister";

interface AddressInitInterface {
    addresses: IAddress[];
    error: string | null;
    loading: boolean;
};

const initialState: AddressInitInterface = {
    addresses: [],
    error: "",
    loading: false,
};

const addressSlice = createSlice({
    name: "addressSlice",

    initialState,

    reducers: {
        storeAddress(state, action) {
        state.addresses = action.payload;
        state.loading = false;
        },

        toggleAddressLoading(state) {
        state.loading = state.loading ? false : true;
        },
    },
});

export const 
    {   storeAddress, 
        toggleAddressLoading 
    } = addressSlice.actions;

export default addressSlice.reducer;
