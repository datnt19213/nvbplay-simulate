import { applyPromotion } from "@/services/cart";
import { getPromotionDatas } from "@/services/promotion";
import { useMutation, useQuery } from "@tanstack/react-query";
export const usePromotion = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotionDatas,
  });

  const applyPromotionMutation = useMutation({
    mutationFn: ({
      cartId,
      promoCodes,
    }: {
      cartId: string;
      promoCodes: string[];
    }) => applyPromotion(cartId, promoCodes),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    data: data?.data?.promotions,
    isLoading,
    error,
    applyPromotion: {
      applyPromotion: applyPromotionMutation.mutate,
      applyPromotionAsync: applyPromotionMutation.mutateAsync,
      isLoading: applyPromotionMutation.isPending,
      error: applyPromotionMutation.error,
    },
  };
};
