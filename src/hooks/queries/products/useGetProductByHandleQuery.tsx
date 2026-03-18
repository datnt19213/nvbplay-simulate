"use client";

import { getProductByHandle } from "@/services/products";
import { useQuery } from "@tanstack/react-query";

const useGetProductByHandleQuery = (slug: string) => {
  const query = useQuery({
    queryKey: ["detail-product", slug],
    queryFn: () => getProductByHandle(slug),
    enabled: !!slug,
  });

  const data = query.data?.data?.data?.data ;

  return {
    query,
    data,
  };
};

export default useGetProductByHandleQuery;
