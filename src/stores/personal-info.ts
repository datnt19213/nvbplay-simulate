"use client";
import {createSlice} from "@reduxjs/toolkit";

interface PersonalInfoState {
  date: string;
}

const initialState: PersonalInfoState = {
  date: new Date().toLocaleString(),
};

export const personalInfoSlice = createSlice({
  name: "personal-info",
  initialState: initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const {setDate} = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
