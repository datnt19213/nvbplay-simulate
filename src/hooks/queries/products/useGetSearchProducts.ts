"use client";

import { getSearchProducts } from "@/services/products";
import { RootState } from "@/stores";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDebounceValue } from "usehooks-ts";

const useGetSearchProducts = () => {
  const keyword = useSelector((state: RootState) => state.search.searchKeyword);
  const [debouncedValue, setValue] = useDebounceValue("", 1000);

  useEffect(() => {
    setValue(keyword);
  }, [keyword]);

  const query = useQuery({
    queryKey: ["search-products", debouncedValue],
    queryFn: () =>
      getSearchProducts({
        q: debouncedValue,
        page: "1",
        page_size: "20",
      }),
    placeholderData: keepPreviousData,
    enabled: !!debouncedValue,
  });

  const data = query.data?.data?.data?.data?.hits || [];

  return {
    ...query,
    data,
  };
};

export default useGetSearchProducts;
