"use client";
import {createSlice} from "@reduxjs/toolkit";

interface CheckoutState {
  methodShipping: string;
  addressSelected: string;
  paymentSelected: string;

  //
  isOtherCustomerReceiveOrder: boolean;
}

const initialState: CheckoutState = {
  methodShipping: "giao_hang_tan_noi",
  addressSelected: "address-1",
  paymentSelected: "1",

  //
  isOtherCustomerReceiveOrder: false,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    setMethodShipping: (state, action) => {
      state.methodShipping = action.payload;
    },
    setAddressSelected: (state, action) => {
      state.addressSelected = action.payload;
    },
    setPaymentSelected: (state, action) => {
      state.paymentSelected = action.payload;
    },

    //

    setIsOtherCustomerReceiveOther: (state, action) => {
      state.isOtherCustomerReceiveOrder = action.payload;
    },
  },
});

export const {
  setMethodShipping,
  setAddressSelected,
  setPaymentSelected,
  setIsOtherCustomerReceiveOther,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
