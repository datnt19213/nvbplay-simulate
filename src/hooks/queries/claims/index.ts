import { getReturnReason } from "@/services/claim";
import { IReturnReason } from "@/types/claims";
import { IResponse } from "@/types/response/response.type";
import { useQuery } from "@tanstack/react-query";

export const useReturnReason = () => {
  const { data, isLoading, error, ...rest } = useQuery<{
    data: {
      return_reasons: IReturnReason[];
    };
  }>({
    queryKey: ["return-reason"],
    queryFn: getReturnReason,
  });

  return { data: data?.data.return_reasons, isLoading, error, ...rest };
};
