import { useQuery } from "@tanstack/react-query";
import { getCollectionProducts } from "@/services/collections";
import { IResponse } from "@/types/response/response.type";
import { CollectionProduct } from "@/services/collections/type";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { removeEmptyKeys } from "@/utilities/helper";

export const useCollections = () => {
  const querySearch = useSelector((state: RootState) => state.search);

  const { selectedSaleChannel } = querySearch;

  const params = removeEmptyKeys({
    "sales_channels_ids[]": selectedSaleChannel.map((i) => i.value).join(","),
  });
  const { data, ...rest } = useQuery<IResponse<CollectionProduct[]>>({
    queryKey: ["collections", selectedSaleChannel],
    queryFn: () => getCollectionProducts(params),
  });

  return { data: data?.data.data, ...rest };
};
