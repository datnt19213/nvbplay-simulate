"use client";
import { ProductCategory } from "@/types/categories/categories.type";
import {createSlice} from "@reduxjs/toolkit";

interface CategoryMenuState {
  isActive: ProductCategory | null;
}

const initialState: CategoryMenuState = {
  isActive: null,
};

export const categorySlice = createSlice({
  name: "category-menu",
  initialState: initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const {setActiveMenu} = categorySlice.actions;

export default categorySlice.reducer;