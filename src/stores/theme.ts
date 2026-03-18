"use client";
import {createSlice} from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
  overlay: boolean;
}

const initialState: ThemeState = {
  theme: "light",
  overlay: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme == "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setOverlay: (state, action) => {
      state.overlay = action.payload;
    },
  },
});

export const {toggleTheme, setTheme, setOverlay} = themeSlice.actions;

export default themeSlice.reducer;
