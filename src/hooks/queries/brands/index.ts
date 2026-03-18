import { getBrands } from "@/services/brands";
import { IBrand } from "@/types/brands";
import { IResponse } from "@/types/response/response.type";
import { useQuery } from "@tanstack/react-query";

export const useBrands = () => {
  const { data, isLoading, error, isSuccess, ...rest } = useQuery<
    IResponse<IBrand[]>
  >({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  return { data: data?.data.data, isLoading, error, isSuccess, ...rest };
};
