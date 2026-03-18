"use client";
import { createSlice } from "@reduxjs/toolkit";

interface UserDataState {
  user: any;
}

const initialState: UserDataState = {
  user: null,
};

export const usersSlice = createSlice({
  name: "userdata",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = null;
    },
  },
});

export const { setUserData, clearUserData } = usersSlice.actions;

export default usersSlice.reducer;
