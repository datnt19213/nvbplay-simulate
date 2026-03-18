"use client";

import useGetProductByHandleQuery from "@/hooks/queries/products/useGetProductByHandleQuery";
import {
  resetDetailProduct,
  setDetailProduct,
} from "@/stores/detail-product-slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DetailProduct from ".";
import NotFoundBox from "../search-products/components/atom/not-found-box";
import SkeletonProduct from "./components/skeleton-product";

export const ProductContainer = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const { data: productData, query } = useGetProductByHandleQuery(
    `${params.slug}`
  );

  useEffect(() => {
    setTimeout(() => {
      window.scroll(0, 0);
    }, 50);
  }, []);

  if (query.isFetching) {
    dispatch(resetDetailProduct());
    return (
      <div className="container">
        <SkeletonProduct />
      </div>
    );
  }

  if (!productData)
    return (
      <div className="container">
        <NotFoundBox
          title="Không tìm thấy sản phẩm"
          className="py-40"
          showButton
        />
      </div>
    );

  if (productData && query.isSuccess) {
    const data: any = productData;
    dispatch(setDetailProduct(data));
  }

  return <DetailProduct />;
};
