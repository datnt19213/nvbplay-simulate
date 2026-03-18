"use client";

import { getCollectionsList } from "@/services/collections";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetCollectionsQuery = () => {
  const query = useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollectionsList(),
    placeholderData: keepPreviousData,
  });

  return { ...query, data: query?.data?.data?.data?.collections || [] };
};

export default useGetCollectionsQuery;
