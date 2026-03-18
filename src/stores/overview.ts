"use client";
import {createSlice} from "@reduxjs/toolkit";

interface OverviewState {
  currentSortDWMY: "daily" | "weekly" | "monthly" | "yearly";
}

const initialState: OverviewState = {
  currentSortDWMY: "weekly",
};

export const overviewSlice = createSlice({
  name: "personal-info",
  initialState: initialState,
  reducers: {
    setCurrentSortDWMY: (state, action) => {
      state.currentSortDWMY = action.payload;
    },
  },
});

export const {setCurrentSortDWMY} = overviewSlice.actions;

export default overviewSlice.reducer;
