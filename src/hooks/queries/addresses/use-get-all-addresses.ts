import React, {useState} from "react";
import {getCollectionsList} from "@/services/collections";
import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {ENUM} from "@/configs";
import {getUserAddressData} from "@/services/addresses";

export const useQueryGetAllAddreses = () => {
  const [visibleCount, setVisibleCount] = useState(
    Number(ENUM.LOADMORE_ADDRESS_ITEMS)
  );
  const [isLoadMore, setIsLoadMore] = useState(false);

  const query = useQuery({
    queryKey: [ENUM.QK_ADDRESSES],
    queryFn: () => getUserAddressData(),
    placeholderData: [],
  });

  const loadMore = () => {
    if (isLoadMore || !query.data) return;
    setIsLoadMore(true);
    setVisibleCount((prev) => prev + 10);
    setIsLoadMore(false);
  };

  const dataToShow = query.data?.slice(0, visibleCount) || [];
  const hasMore = query.data?.length > visibleCount;

  return {
    query: query,
    data: dataToShow,
    hasMore,
    loadMore,
    isLoadMore,
  };
};
