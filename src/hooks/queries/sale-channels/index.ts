import { getSaleChannels } from "@/services/sale-channels";
import { useQuery } from "@tanstack/react-query";

export const useSaleChannels = () => {
  const { data, isLoading, isError, ...rest } = useQuery({
    queryKey: ["sale-channels"],
    queryFn: getSaleChannels,
  });

  return { data: data?.data?.sales_channels, isLoading, isError, ...rest };
};
