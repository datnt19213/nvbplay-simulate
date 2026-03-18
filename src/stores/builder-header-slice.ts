"use client";
import {createSlice} from "@reduxjs/toolkit";

interface BuilderHeaderState {
  currentEquipment: string | null;
}

const initialState: BuilderHeaderState = {
  currentEquipment: null,
};

export const builderHeaderSlice = createSlice({
  name: "builderHeader",
  initialState: initialState,
  reducers: {
    setCurrentSelectEquipment: (state, action) => {
      state.currentEquipment = action.payload;
    },
  },
});

export const {setCurrentSelectEquipment} = builderHeaderSlice.actions;

export default builderHeaderSlice.reducer;
