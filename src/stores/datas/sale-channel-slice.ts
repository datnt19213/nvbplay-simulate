import { SaleChannel } from "@/types/sale-channels";
import { createSlice } from "@reduxjs/toolkit";

interface SaleChannelState {
  activeSaleChannel?: SaleChannel;
  listSaleChannel: SaleChannel[];
}

const initialState: SaleChannelState = {
  activeSaleChannel: undefined,
  listSaleChannel: [],
};

export const saleChannelSlice = createSlice({
  name: "saleChannel",
  initialState: initialState,
  reducers: {
    setActiveSaleChannel: (state, action) => {
      state.activeSaleChannel = action.payload;
    },
    setListSaleChannel: (state, action) => {
      state.listSaleChannel = action.payload;
    },
  },
});

export const { setActiveSaleChannel, setListSaleChannel } =
  saleChannelSlice.actions;
