"use client";

import LoadingDots from "@/components/base-components/loading/LoadingDots";
import { Button } from "@/components/ui/button";
import useGetAllProductsQuery from "@/hooks/queries/products/useGetAllProductsQuery";
import { setTotalItems } from "@/stores/search-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NotFoundBox from "../atom/not-found-box";
import ProductsSkeleton from "../skeletons/products-skeleton";
import ProductItem from "./product-item";

const ProductListContainer = () => {
  const { productsList, isFetching, isLoading, isLastPage, handleNext } =
    useGetAllProductsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (productsList) {
      dispatch(setTotalItems(productsList.length || 0));
    }
  }, [productsList, isLoading]);

  if (isLoading) return <ProductsSkeleton />;

  if (!productsList || productsList.length === 0)
    return <NotFoundBox className="mt-20" />;

  return (
    <div className="space-y-[24px] px-[16px] pb-10 md:p-0 relative min-h-[50vh]">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-[8px]">
        {productsList?.map((item, index) => (
          <ProductItem data={item} key={index} />
        ))}
      </div>
      {isFetching && (
        <div className="w-full flex justify-center">
          <LoadingDots color="text-red-600" />
        </div>
      )}
      {!isLastPage && !isFetching && (
        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            className=" text-14-21-600 text-red-primary  border-red-primary hover:text-red-primary"
            variant={"outline"}
          >
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductListContainer;

// "use client";

// import { getProductDatas } from "@/services/products";
// import { RootState } from "@/stores";
// import { ProductType } from "@/types/products/product.type";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import NotFoundBox from "../atom/not-found-box";
// import ProductsSkeleton from "../skeletons/products-skeleton";
// import ProductItem from "./product-item";
// import { SORT_OPTIONS } from "@/stores/search-slice";

// const ProductListContainer = () => {
//   // const { data, query } = useGetAllProductsQuery();
//   // redux
//   const searchState = useSelector((state: RootState) => state.search);

//   const [loading, setLoading] = useState(false);
//   const [originalProducts, setOriginalProducts] = useState<ProductType[]>([]);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       // Fetch products without sort parameter
//       const data = await getProductDatas(searchState.searchKeyword, "", "-variants.calculated_price");
//       setOriginalProducts(data.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setOriginalProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchState.searchKeyword, searchState.selectedCategories]);

//   const sortedProducts = useMemo(() => {
//     const currentSortOption = SORT_OPTIONS.find(
//       (option) => option.value === searchState.selectedSort
//     );
//     if (!currentSortOption) {
//       return originalProducts;
//     }
//     return [...originalProducts].sort(currentSortOption.sortFn);
//   }, [originalProducts, searchState.selectedSort]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   if (loading) return <ProductsSkeleton />;

//   if (!sortedProducts && !loading) return <NotFoundBox />;

//   return (
//     <div className="space-y-[24px] px-[16px] md:p-0">
//       <div className="grid md:grid-cols-4 grid-cols-2 gap-[8px]">
//         {sortedProducts?.map((product) => (
//           <ProductItem data={product} key={product.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductListContainer;
