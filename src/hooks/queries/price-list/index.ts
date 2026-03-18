import { useQuery } from "@tanstack/react-query";
import { getPricelist } from "@/services/pricelist";
import { PriceList } from "./type";
import { IResponse } from "@/types/response/response.type";
import { RootState } from "@/stores";
import { removeEmptyKeys } from "@/utilities/helper";
import { useSelector } from "react-redux";

export const usePriceList = () => {
  const querySearch = useSelector((state: RootState) => state.search);

  const { selectedSaleChannel } = querySearch;

  const params = removeEmptyKeys({
    "sales_channels_ids[]": selectedSaleChannel.map((i) => i.value).join(","),
  });
  const { data, isLoading, error, ...rest } = useQuery<
    IResponse<{
      price_lists: PriceList[];
    }>
  >({
    queryKey: ["price-list", selectedSaleChannel],
    queryFn: () => getPricelist(params),
  });

  return {
    data: data?.data?.data?.price_lists || [],
    isLoading,
    error,
    ...rest,
  };
};
