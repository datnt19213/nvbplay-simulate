"use client";
import { createSlice } from "@reduxjs/toolkit";

interface UserAddressDataState {
  userAddress: any;
  listAddress: any[];
}

const initialState: UserAddressDataState = {
  userAddress: null,
  listAddress: [],
};

export const usersAddressSlice = createSlice({
  name: "userAddressData",
  initialState: initialState,
  reducers: {
    setUserAddressData: (state, action) => {
      state.userAddress = action.payload;
    },
    setListAddress: (state, action) => {
      state.listAddress = action.payload;
    },
  },
});

export const { setUserAddressData, setListAddress } = usersAddressSlice.actions;

export default usersAddressSlice.reducer;
