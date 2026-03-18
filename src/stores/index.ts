"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { categorySlice } from "./category-menu-slice";
import { checkoutSlice } from "./checkout";
import { countdownSlice } from "./count-down";
import { usersAddressSlice } from "./datas/addresses-data-slice";
import { ordersSlice } from "./datas/orders-data-slice";
import { usersSlice } from "./datas/users-data-slice";
import { detailProductSlice } from "./detail-product-slice";
import { personalInfoSlice } from "./personal-info";
import { profileSlice } from "./profile";
import { searchSlice } from "./search-slice";
import { suggestionSlice } from "./suggestion";
import { themeSlice } from "./theme";
import { cartSlice } from "./datas/cart-slice";
import { orderSlice } from "./datas/order-slice";
import { blogSlice } from "./blog/blog-slice";
import { addressSlice } from "./address-slice";
import { coinNVBSlice } from "./coin-nvb-slice";
import { ratingSlice } from "./ratings";
import { priceListSlice } from "./datas/price-list";
import { productsSlice } from "./datas/products-slice";
import { collectionsSlice } from "./datas/collections";
import { builderHeaderSlice } from "./builder-header-slice";
import { overviewSlice } from "./overview";
import { ghostSlice } from "./ghost";
import { saleChannelSlice } from "./datas/sale-channel-slice";
import { kycSlice } from "./kyc-slice";
import { chatSlice } from "./chats";
import { wishlistSlice } from "./wishlist";
import {builderSlice} from "./builder-slice";

const appReducer = combineReducers({
  theme: themeSlice.reducer,
  categoryMenu: categorySlice.reducer,
  suggestion: suggestionSlice.reducer,
  search: searchSlice.reducer,
  auth: authSlice.reducer,
  countdown: countdownSlice.reducer,
  profile: profileSlice.reducer,
  personal_info: personalInfoSlice.reducer,
  checkout: checkoutSlice.reducer,
  address: addressSlice.reducer,
  coinNVB: coinNVBSlice.reducer,
  ratings: ratingSlice.reducer,
  builderHeader: builderHeaderSlice.reducer,
  overview: overviewSlice.reducer,
  kyc: kycSlice.reducer,
  builder: builderSlice.reducer,

  // Data slice
  users_data: usersSlice.reducer,
  users_address_data: usersAddressSlice.reducer,
  order_data_slice: ordersSlice.reducer,
  detail_product: detailProductSlice.reducer,
  cart_slice: cartSlice.reducer,
  order_slice: orderSlice.reducer,
  price_list: priceListSlice.reducer,
  products: productsSlice.reducer,
  collections: collectionsSlice.reducer,
  sale_channel: saleChannelSlice.reducer,

  // Blog
  blog: blogSlice.reducer,
  ghost: ghostSlice.reducer,

  // Chat
  chat: chatSlice.reducer,

  // Wishlist
  wishlist: wishlistSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET") {
    state = undefined; // Xóa toàn bộ state
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// "use client";

// import {configureStore} from "@reduxjs/toolkit";
// import {authSlice} from "./auth";
// import {categorySlice} from "./category-menu-slice";
// import {checkoutSlice} from "./checkout";
// import {countdownSlice} from "./count-down";
// import {usersAddressSlice} from "./datas/addresses-data-slice";
// import {ordersSlice} from "./datas/orders-data-slice";
// import {usersSlice} from "./datas/users-data-slice";
// import {detailProductSlice} from "./detail-product-slice";
// import {personalInfoSlice} from "./personal-info";
// import {profileSlice} from "./profile";
// import {searchSlice} from "./search-slice";
// import {suggestionSlice} from "./suggestion";
// import {themeSlice} from "./theme";
// import {cartSlice} from "./datas/cart-slice";
// import {orderSlice} from "./datas/order-slice";
// import {blogSlice} from "./blog/blog-slice";
// import {addressSlice} from "./address-slice";
// import {coinNVBSlice} from "./coin-nvb-slice";
// import {ratingSlice} from "./ratings";
// import { priceListSlice } from "./datas/price-list";

// export const store = configureStore({
//   reducer: {
//     theme: themeSlice.reducer,
//     categoryMenu: categorySlice.reducer,
//     suggestion: suggestionSlice.reducer,
//     search: searchSlice.reducer,
//     auth: authSlice.reducer,
//     countdown: countdownSlice.reducer,
//     profile: profileSlice.reducer,
//     personal_info: personalInfoSlice.reducer,
//     checkout: checkoutSlice.reducer,
//     address: addressSlice.reducer,
//     coinNVB: coinNVBSlice.reducer,
//     ratings: ratingSlice.reducer,

//     // Data slice
//     users_data: usersSlice.reducer,
//     users_address_data: usersAddressSlice.reducer,
//     order_data_slice: ordersSlice.reducer,
//     detail_product: detailProductSlice.reducer,
//     cart_slice: cartSlice.reducer,
//     order_slice: orderSlice.reducer,
//     price_list: priceListSlice.reducer,

//     // Blog
//     blog: blogSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
