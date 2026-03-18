"use client";
import { createSlice } from "@reduxjs/toolkit";

interface OrderDataState {
  orderList: any;
  orderDetail: any;
}

const initialState: OrderDataState = {
  orderList: null,
  orderDetail: null,
};

export const ordersSlice = createSlice({
  name: "orderdata",
  initialState: initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderList = action.payload;
    },
    setOrderDetailData: (state, action) => {
      state.orderDetail = action.payload;
    },
    updateOrderDetailData: (state, action) => {
      state.orderDetail = action.payload;
    },
  },
});

export const { setOrderData, setOrderDetailData, updateOrderDetailData } =
  ordersSlice.actions;

export default ordersSlice.reducer;
