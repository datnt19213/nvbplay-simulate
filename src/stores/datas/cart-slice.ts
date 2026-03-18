import { Cart, CartItem } from "@/services/cart/type";
import { createSlice } from "@reduxjs/toolkit";

interface CartDataState {
  cart: Cart | null;
  promotions?: string[];
  itemsActive?: string[];
  isLoading: boolean;
}

const initialState: CartDataState = {
  cart: null,
  isLoading: false,
  itemsActive: [],
  promotions: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // HANDLE CART DATA
    setCartData: (state, action) => {
      state.cart = action.payload;
    },
    removeCartData: (state) => {
      state.cart = null;
    },
    setCartItems: (state, action) => {
      const items = action.payload;
      if (state.cart) {
        if (state.cart.items) {
          state.cart.items = items;
        } else {
          state.cart.items = items;
        }
      }
    },
    addItem: (state, action) => {
      const items = action.payload;
      state.cart?.items.push(items);
    },
    updateItemQuantity: (state, action) => {
      const { cartId, lineItemId, quantity } = action.payload;
      const cart = state.cart;
      const item = cart?.items?.find((item: any) => item.id === lineItemId);
      if (item) {
        item.quantity = quantity;
      }
      state.cart = cart;
    },
    removeItem: (state, action) => {
      const { lineItemId } = action.payload;
      const cart = state.cart;
      if (cart) {
        cart.items = cart.items.filter((item: any) => item.id !== lineItemId);
      }
      state.cart = cart;
    },
    setCartAvailability: (state, action) => {
      const { variantId, availability } = action.payload;
      const cart = state.cart;
      const item = cart?.items?.find(
        (item: CartItem) => item.variant_id === variantId
      );
      if (item) {
        item.availability = availability;
      }
      state.cart = cart;
    },
    setCartEnable: (state, action) => {
      const { variantId } = action.payload;
      const cart = state.cart;
      const item = cart?.items?.find(
        (item: CartItem) => item.variant_id === variantId
      );
      if (item) {
        item.disable = false;
      }
      state.cart = cart;
    },
    setCartDisable: (state, action) => {
      const { variantId } = action.payload;
      const cart = state.cart;
      const item = cart?.items?.find(
        (item: CartItem) => item.variant_id === variantId
      );
      if (item) {
        item.disable = true;
        state.itemsActive = state?.itemsActive?.filter(
          (activeItemId: any) => activeItemId !== item.id
        );
      }
      state.cart = cart;
    },

    // HANDLE PROMOTIONS
    setPromotions: (state, action) => {
      state.promotions = action.payload;
    },
    removePromotions: (state) => {
      state.promotions = [];
    },

    // HANDLE ITEMS ACTIVE
    setItemsActive: (state, action) => {
      state.itemsActive = action.payload;
    },
    removeItemsActive: (state) => {
      state.itemsActive = [];
    },
    removeItemActive: (state, action) => {
      state.itemsActive = state.itemsActive?.filter(
        (item: any) => item !== action.payload
      );
    },
  },
});

export const {
  setIsLoading,
  setCartData,
  removeCartData,
  addItem,
  updateItemQuantity,
  removeItem,
  setCartAvailability,
  setPromotions,
  removePromotions,
  setItemsActive,
  setCartItems,
  removeItemsActive,
  removeItemActive,
  setCartDisable,
  setCartEnable,
} = cartSlice.actions;

export default cartSlice.reducer;
