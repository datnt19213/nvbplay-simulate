"use client";
import {IdentifyCardBack, IdentifyCardFront} from "@/assets/images";
import {createSlice} from "@reduxjs/toolkit";

interface KycState {
  idCard: {
    front: any;
    back: any;
  };
  kycModalAuthorized: boolean;
}

const initialState: KycState = {
  idCard: {
    front: IdentifyCardFront.src,
    back: IdentifyCardBack.src,
  },
  kycModalAuthorized: false,
};

export const kycSlice = createSlice({
  name: "kyc",
  initialState: initialState,
  reducers: {
    setIdCard: (state, action) => {
      state.idCard = action.payload;
    },
    setKycModalAuthorized: (state, action) => {
      state.kycModalAuthorized = action.payload;
    },
  },
});

export const {setIdCard, setKycModalAuthorized} = kycSlice.actions;

export default kycSlice.reducer;
