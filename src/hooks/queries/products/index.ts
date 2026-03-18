import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/products";
import { IResponse } from "@/types/response/response.type";
import { IProductsResponse } from "./type";
import { useState } from "react";
import { removeEmptyKeys } from "@/utilities/helper";

export const useProducts = () => {
  const LIMIT = 10;
  const [pagination, setPagination] = useState({
    page: 1,
    limit: LIMIT,
  });

  const params = removeEmptyKeys({
    page: pagination.page,
    page_size: pagination.limit,
  });

  const handleNext = () => {
    setPagination({
      ...pagination,
      limit: pagination.limit + LIMIT,
    });
  };

  const { data, isLoading, isError, ...rest } = useQuery<
    IResponse<{
      list_of_products: IProductsResponse[];
      last_pages: number;
      current_page: number;
      page_size: number;
      previous_page: number;
      next_page: number;
    }>
  >({
    queryKey: ["products", pagination.limit],
    queryFn: () => getAllProducts(params),
    placeholderData: keepPreviousData,
  });

  return {
    products: data?.data?.data?.list_of_products,
    isLoading,
    isError,
    handleNext,
    isLastPage: data?.data?.data?.last_pages === pagination.page,
    page_size: data?.data?.data?.page_size,
    ...rest,
  };
};
