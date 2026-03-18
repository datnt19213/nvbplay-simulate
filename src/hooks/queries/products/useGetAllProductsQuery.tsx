"use client";

import useSearchFilter from "@/hooks/useSearchFilter";
import {getAllProducts} from "@/services/products";
import {RootState} from "@/stores";
import {OrderByEnum, setSearchKeyword} from "@/stores/search-slice";
import {removeEmptyKeys} from "@/utilities/helper";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDebounceValue} from "usehooks-ts";

interface IPagination {
  page: number;
  limit: number;
}

const LIMIT = 8;

const useGetAllProductsQuery = () => {
  const searchParams = useSearchParams();
  const {dispatchItem} = useSearchFilter("selectedCollections");
  const {dispatchItem: dispatchCategory} =
    useSearchFilter("selectedCategories");
  const {dispatchItem: dispatchProvider} = useSearchFilter("selectedProviders");
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: LIMIT,
  });
  const [debouncedValue, setValue] = useDebounceValue("", 500);

  const handleNext = () => {
    setPagination({...pagination, limit: pagination.limit + LIMIT});
  };

  const querySearch = useSelector((state: RootState) => state.search);

  const {
    searchKeyword,
    selectedSort,
    selectedCollections,
    selectedCategories,
    selectedProviders,
    selectedSaleChannel,
  } = querySearch;

  useEffect(() => {
    setValue(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setValue(query);
      dispatch(setSearchKeyword(query));
    }
    const collections = searchParams.get("collections");
    if (collections) {
      const collectionsArray = collections.split(",");
      collectionsArray.forEach((collection) => {
        dispatchItem({label: collection, value: collection});
      });
    }
    const categories = searchParams.get("categories");
    if (categories) {
      const categoriesArray = categories.split(",");
      categoriesArray.forEach((category) => {
        dispatchCategory({label: category, value: category});
      });
    }

    const brands = searchParams.get("brands");
    if (brands) {
      const brandsArray = brands.split(",");
      brandsArray.forEach((brand) => {
        dispatchProvider({label: brand, value: brand});
      });
    }
  }, []);

  const params = removeEmptyKeys({
    q: debouncedValue,
    page: pagination.page,
    page_size: pagination.limit,
    "collections_slug[]": selectedCollections.map((i) => i.value).join(","),
    "categories_slug[]": selectedCategories.map((i) => i.value).join(","),
    "brands_slug[]": selectedProviders.map((i) => i.value).join(","),
    "sales_channels_ids[]": selectedSaleChannel.map((i) => i.value).join(","),
    new_product: selectedSort === OrderByEnum.DATE_DESC ? 1 : "",
    sort_price:
      selectedSort === OrderByEnum.PRICE_DESC
        ? "desc"
        : selectedSort === OrderByEnum.PRICE_ASC
          ? "asc"
          : "",
  });

  const query = useQuery({
    queryKey: [
      "products",
      debouncedValue,
      selectedSort,
      selectedCollections,
      selectedCategories,
      selectedProviders,
      selectedSaleChannel,
      pagination.limit,
    ],
    queryFn: () => getAllProducts(params),
    placeholderData: keepPreviousData,
  });

  const productsList = (() => {
    const res = query.data?.data.data?.list_of_products;
    if (!res || !Array.isArray(res)) {
      return [];
    }
    return res;
  })();

  return {
    ...query,
    productsList,
    isLastPage: query.data?.data?.data?.last_pages === pagination.page,
    handleNext,
  };
};

export default useGetAllProductsQuery;
