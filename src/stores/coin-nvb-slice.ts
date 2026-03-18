"use client";
import {createSlice} from "@reduxjs/toolkit";

interface CoinNVBState {
  currentFilter: string;
}

const initialState: CoinNVBState = {
  currentFilter: "all",
};

export const coinNVBSlice = createSlice({
  name: "coinNVB",
  initialState: initialState,
  reducers: {
    setCurrentFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
});

export const {setCurrentFilter} = coinNVBSlice.actions;

export default coinNVBSlice.reducer;
