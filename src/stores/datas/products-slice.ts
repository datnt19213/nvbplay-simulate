import { Cart } from "@/services/cart/type";
import { Product } from "@/services/products/type";
import { createSlice } from "@reduxjs/toolkit";

interface ProductOutofStock extends Product {}

interface ProductsDataState {
  products: ProductOutofStock[];
}

const initialState: ProductsDataState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProducts: (state) => {
      state.products = [];
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const product = action.payload;
      const index = state.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        state.products[index] = product;
      }
    },
  },
});

export const {
  setProducts,
  removeProducts,
  addProduct,
  removeProduct,
  updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
