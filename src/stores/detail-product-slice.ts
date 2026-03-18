"use client";

import { ProductType } from "@/types/products/product.type";
import { createSlice } from "@reduxjs/toolkit";

export interface DetailProductSliceState {
  data: ProductType | null;
  selectedSize: string;
  selectedColor: string;
  selectedWeight: string;
  quantity: number;
  variant: any;
}

const initialState: DetailProductSliceState = {
  data: null,
  selectedSize: "",
  selectedColor: "",
  selectedWeight: "",
  quantity: 1,
  variant: null,
};

export const detailProductSlice = createSlice({
  name: "detail-product-slice",
  initialState: initialState,
  reducers: {
    setDetailProduct: (state, action) => {
      state.data = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSelectedWeight: (state, action) => {
      state.selectedWeight = action.payload;
    },
    setVariant: (state, action) => {
      state.variant = action.payload;
    },
    resetDetailProduct: (state) => {
      state = initialState;
    },
  },
});

export const {
  setDetailProduct,
  setSelectedSize,
  setQuantity,
  setSelectedColor,
  setSelectedWeight,
  resetDetailProduct,
  setVariant,
} = detailProductSlice.actions;

export default detailProductSlice.reducer;
