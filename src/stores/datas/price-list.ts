import { PriceList } from "@/hooks/queries/price-list/type";
import { createSlice } from "@reduxjs/toolkit";

interface PriceListState {
  active: string | null;
  priceList: PriceList[] | null;
}

const initialState: PriceListState = {
  priceList: [],
  active: null,
};

export const priceListSlice = createSlice({
  name: "price-list",
  initialState: initialState,
  reducers: {
    setPriceList: (state, action) => {
      state.priceList = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setProductAvailability: (state, action) => {
      const { variantId, quantity } = action.payload;
      const priceList = state.priceList?.find(
        (price) => price.id === state.active
      );
      if (priceList) {
        priceList.prices.forEach((price) => {
          if (price.variant_id === variantId) {
            price.availability = quantity;
          }
        });
      }
    },
    setProductOutofStock: (state, action) => {
      const { variantId } = action.payload;
      const priceList = state.priceList?.find(
        (price) => price.id === state.active
      );
      if (priceList) {
        priceList.prices.forEach((price) => {
          if (price.variant_id === variantId) {
            price.is_out_of_stock = true;
          }
        });
      }
    },
  },
});

export const {
  setPriceList,
  setActive,
  setProductAvailability,
  setProductOutofStock,
} = priceListSlice.actions;
export default priceListSlice.reducer;
