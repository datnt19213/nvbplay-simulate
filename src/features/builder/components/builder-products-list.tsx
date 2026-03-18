"use client";
import ProductCard from "@/components/base-components/cards/product-card";
import useGetAllProductsQuery from "@/hooks/queries/products/useGetAllProductsQuery";
import {RootState} from "@/stores";
import React from "react";
import {useSelector} from "react-redux";
import ProductBuilderCard from "../elements/product-builder-card";

const BuilderProductsList = () => {
  const {productsList, isLoading, isSuccess} = useGetAllProductsQuery();
  return (
    <div className="h-[calc(100dvh-209px)] overflow-y-scroll scrollbar-thin relative">
      {isSuccess && (
        <div className="w-full mx-auto grid [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:1650px)]:grid-cols-4 [@media(min-width:1440px)]:grid-cols-3 [@media(min-width:1280px)]:grid-cols-2 gap-3 p-5">
          {Array.from({length: 10}, (_, i) => i).map((_, index) => (
            <ProductBuilderCard
              key={index}
              itemIndex={index}
              isSelected={index % 2 === 0 && true}
              data={{a: undefined}}
            />
          ))}
        </div>
      )}
      {/* <div className="w-full bg-gradient-to-b from-transparent to-gray-primary h-[120] absolute bottom-0 left-0"></div> */}
    </div>
  );
};

export default BuilderProductsList;
