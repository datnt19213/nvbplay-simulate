"use client";
import { Order } from "@/types/order";
import { createSlice } from "@reduxjs/toolkit";

interface OrderDataState {
  order: Order | null;
}

const initialState: OrderDataState = {
  order: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.order = action.payload;
    },
    removeOrderData: (state) => {
      state.order = null;
    },
  },
});

export const { setOrderData, removeOrderData } = orderSlice.actions;

export default orderSlice.reducer;
