import { Wishlist } from "@/services/wishlist/type";
import { createSlice } from "@reduxjs/toolkit";

interface WishlistState {
  wishlist: Wishlist | null;
}

const initialState: WishlistState = {
  wishlist: null,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, { payload }) => {
      state.wishlist = payload;
    },
    removeWishlist: (state, { payload: productVariantId }) => {
      if (state?.wishlist) {
        state.wishlist = {
          ...state.wishlist,
          items: state?.wishlist?.items?.filter(
            (item) => item.product_variant_id !== productVariantId
          ),
        };
      }
    },

    addWishlist: (state, { payload: variantItems }) => {
      if (state?.wishlist) {
        state.wishlist = {
          ...state.wishlist,
          items: [...(state.wishlist?.items || []), variantItems],
        };
      }
    },

    resetWishlist: () => initialState,
  },
});

export const { setWishlist, resetWishlist, addWishlist, removeWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
