import { CountdownSkeleton } from "./coudown";
import { TabDealSkeleton } from "./deal-tab";
import ProductCardSkeleton from "./product-carousel-item";

export const DealProductSkeleton = () => {
  return (
    <div className="flex flex-col rounded-lg bg-white">
      <div className="flex justify-between gap-0 items-center mb-4 border-b border-b-gray-100">
        {/* TAB */}
        <div className="pl-4 w-full">
          <TabDealSkeleton />
        </div>
        {/* COUNT DOWN */}
        <CountdownSkeleton />
      </div>
      <div className="px-4">
        {/* PRODUCT LIST */}
        <div className="hidden md:grid md:grid-cols-5 gap-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>

        <div className="grid md:hidden grid-cols-2 gap-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
