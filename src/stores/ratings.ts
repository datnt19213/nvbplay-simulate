"use client";
import {createSlice} from "@reduxjs/toolkit";

interface RatingState {
  currentFilter: string;
}

const initialState: RatingState = {
  currentFilter: "unprecedented",
};

export const ratingSlice = createSlice({
  name: "ratings",
  initialState: initialState,
  reducers: {
    setCurrentFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
});

export const {setCurrentFilter} = ratingSlice.actions;

export default ratingSlice.reducer;
