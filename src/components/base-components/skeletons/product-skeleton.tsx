import React from "react";
import {ShimmerLoad} from "./element";

const ProductSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center relative animate-fade-up overflow-hidden rounded-lg pt-3">
      <ShimmerLoad />
      <div className="relative">
        <div className="aspect-square rounded-lg bg-gray-border w-full h-[200px]"></div>
        <div className="absolute top-0 inset-x-0 flex pt-3 px-4 items-center justify-between">
          <div className="w-12 h-6 bg-gray-border rounded flex items-center"></div>
          <div className="w-8 h-8 bg-gray-border rounded-full"></div>
        </div>
      </div>
      <div className="p-4 w-full flex flex-col gap-3">
        <div className="h-4 bg-gray-border w-3/4 rounded"></div>
        <div>
          <div className="h-5 bg-gray-border rounded w-1/2"></div>
          <div className="h-3 bg-gray-border rounded w-1/2 mt-2"></div>
        </div>
        <div className="h-4 bg-gray-border w-full rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
