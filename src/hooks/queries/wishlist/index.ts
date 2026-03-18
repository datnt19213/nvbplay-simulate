import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addItemToWishlist,
  createWishlist,
  getWishlist,
  removeItemFromWishlist,
} from "@/services/wishlist";

export const useWishlist = (customer_id: string) => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["wishlist", customer_id],
    queryFn: () => getWishlist(customer_id),
    enabled: !!customer_id,
  });

  return {
    data: data?.data.data,
    isLoading,
    ...rest,
  };
};

export const useWishlistMutation = () => {
  const createWishlistMutation = useMutation({
    mutationFn: (data: { customer_id: string; sales_channel_id: string }) =>
      createWishlist(data.customer_id, data.sales_channel_id),
    onSuccess: (res) => {
      return res;
    },
    onError: (err: Error) => {
      return err;
    },
  });

  const addItemToWishlistMutation = useMutation({
    mutationFn: (data: {
      customer_id: string;
      variant_id: string;
      sales_channel_id: string;
    }) =>
      addItemToWishlist(
        data.customer_id,
        data.variant_id,
        data.sales_channel_id
      ),
    onSuccess: (res) => {
      return res;
    },
    onError: (err: Error) => {
      return err;
    },
  });

  const removeItemFromWishlistMutation = useMutation({
    mutationFn: (data: { customer_id: string; wishlist_item_id: string }) =>
      removeItemFromWishlist(data.customer_id, data.wishlist_item_id),
    onSuccess: (res) => {
      return res;
    },
    onError: (err: Error) => {
      return err;
    },
  });

  return {
    createWishlistMutation,
    addItemToWishlistMutation,
    removeItemFromWishlistMutation,
  };
};
