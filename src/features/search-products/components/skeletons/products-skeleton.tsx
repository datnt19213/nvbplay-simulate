import React from "react";

const ProductSkeleton: React.FC = () => {
  return (
    <div className="relative bg-white rounded-lg p-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square w-full bg-gray-200 rounded-lg mb-4" />

      {/* Color Options Skeleton */}
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="w-4 h-4 rounded-full bg-gray-200" />
        ))}
      </div>

      {/* Title Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

      {/* Description Skeleton */}
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />

      {/* Rating Skeleton */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="w-3 h-3 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>

      {/* Price Skeleton */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>

      {/* Footer Info Skeleton */}
      <div className="flex justify-between">
        <div className="h-3 bg-gray-200 rounded w-20" />
        <div className="h-3 bg-gray-200 rounded w-16" />
      </div>
    </div>
  );
};

const ProductsSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSkeleton;
