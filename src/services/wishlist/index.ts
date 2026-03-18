import { axios_instance } from "@/apis";
import { Wishlist } from "./type";
import { IResponse } from "@/types/response/response.type";

export const createWishlist = async (
  customer_id: string,
  sales_channel_id: string
) => {
  return (
    await axios_instance.post<IResponse<Wishlist>>(`/wishlist`, {
      customer_id,
      sales_channel_id,
    })
  ).data;
};

export const getWishlist = async (customer_id: string) => {
  return (
    await axios_instance.post<IResponse<Wishlist[]>>(`/wishlist/list`, {
      customer_id,
    })
  ).data;
};

export const addItemToWishlist = async (
  customer_id: string,
  variant_id: string,
  sales_channel_id: string
) => {
  return (
    await axios_instance.post(`/wishlist/items`, {
      customer_id,
      variant_id,
      sales_channel_id,
    })
  ).data;
};

export const removeItemFromWishlist = async (
  customer_id: string,
  wishlist_item_id: string
) => {
  return (
    await axios_instance.post(`/wishlist/items/delete`, {
      customer_id,
      wishlist_item_id,
    })
  ).data;
};

export const shareWishlist = async (
  customer_id: string,
  sales_channel_id: string
) => {
  return (
    await axios_instance.post(`/wishlist/share`, {
      customer_id,
      sales_channel_id,
    })
  ).data;
};

export const retrieveWishlist = async (
  sales_channel_id: string,
  token: string
) => {
  return (
    await axios_instance.post(`/wishlist/token/share`, {
      sales_channel_id,
      token,
    })
  ).data;
};
