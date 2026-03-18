import { addNoteOrder, cancelOrder, getOrdersData } from "@/services/orders";
import { IOrderResponse } from "./type";

import { useQuery, useMutation } from "@tanstack/react-query";

export const useOrders = () => {
  const { data, isLoading, isError, ...rest } = useQuery<{
    order: IOrderResponse;
  }>({
    queryKey: ["orders"],
    queryFn: () => getOrdersData(),
  });

  const addNoteOrderMutation = useMutation({
    mutationFn: ({ orderID, data }: { orderID: string; data: any }) =>
      addNoteOrder(orderID, data),
    onSuccess: (res) => {
      return res;
    },
    onError: (error) => {
      return error;
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: ({ orderID }: { orderID: string }) => cancelOrder(orderID),
    onSuccess: (res) => {
      return res;
    },
    onError: (error) => {
      return error;
    },
  });

  return {
    data,
    isLoading,
    isError,
    ...rest,
    addNoteOrderMutation: {
      addNoteOrder: addNoteOrderMutation.mutate,
      addNoteOrderAsync: addNoteOrderMutation.mutateAsync,
      isLoading: addNoteOrderMutation.isPending,
      isError: addNoteOrderMutation.isError,
    },
    cancelOrderMutation: {
      cancelOrder: cancelOrderMutation.mutate,
      cancelOrderAsync: cancelOrderMutation.mutateAsync,
      isLoading: cancelOrderMutation.isPending,
      isError: cancelOrderMutation.isError,
    },
  };
};
