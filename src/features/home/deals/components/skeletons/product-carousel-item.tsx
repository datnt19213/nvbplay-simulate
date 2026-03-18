const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center animate-pulse">
      {/* Skeleton for Image */}
      <div className="relative w-full">
        <div className="aspect-square w-full rounded-lg bg-gray-200"></div>
        <div className="absolute top-0 inset-x-0 flex pt-3 px-4 items-center justify-between">
          {/* Skeleton for Discount Badge */}
          <div className="w-[49px] h-[22px] bg-gray-300 rounded"></div>
          {/* Skeleton for Favorite Button */}
          <div className="size-[30px] rounded-full bg-gray-300"></div>
        </div>
      </div>

      <div className="p-4 w-full flex flex-col gap-3">
        {/* Skeleton for Title */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-2/4"></div>

        {/* Skeleton for Prices */}
        <div className="flex flex-col gap-1">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>

        {/* Skeleton for Badge */}
        <div className="w-full h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
