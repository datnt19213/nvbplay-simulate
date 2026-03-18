"use client";
import {createSlice} from "@reduxjs/toolkit";

interface SuggestionState {
  currentCategory: string;
}

const initialState: SuggestionState = {
  currentCategory: "tatca",
};

export const suggestionSlice = createSlice({
  name: "suggestion",
  initialState: initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const {setCurrentCategory} = suggestionSlice.actions;

export default suggestionSlice.reducer;
