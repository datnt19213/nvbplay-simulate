const ProductCardSkeleton = ({
  withButton = false,
}: {
  withButton?: boolean;
}) => {
  return (
    <div className="flex flex-col flex-1 w-full relative items-center bg-white rounded-lg animate-pulse">
      <div className="relative w-full">
        {/* Skeleton for Image */}
        <div className="w-full h-[167px] desktop:h-[230px] bg-gray-200 rounded-lg"></div>

        {/* Skeleton for Top Badge */}
        <div className="absolute w-full top-0 inset-x-0 flex pt-3 px-4 items-center justify-between">
          <div className="w-[49px] h-[22px] bg-gray-300 rounded"></div>
          <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <div className="p-4 w-full h-full flex flex-col items-start justify-between gap-3">
        <div className="flex flex-col justify-between w-full h-full gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1.5">
              {/* Skeleton for Title */}
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>

              {/* Skeleton for Rating and Review */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-16 bg-gray-300 rounded"></div>
                <div className="hidden desktop:block h-3 w-10 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Skeleton for Price */}
            <div className="flex flex-col gap-1">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            {/* Skeleton for Stock and Sold Info */}
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>

        {/* Skeleton for Add to Cart Button */}
        {withButton && (
          <div className="w-full h-10 bg-gray-300 rounded-lg"></div>
        )}
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
