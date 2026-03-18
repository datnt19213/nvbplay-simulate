import React from "react";
import Countdown from "@/components/base-components/counter/date";
import TabDeal from "./tab";
import ProductCarousel from "./product-carousel";

export const DealProduct = () => {
  return (
    <div className="flex flex-col rounded-lg bg-white">
      <div className="flex justify-between gap-0 items-center mb-4 border-b border-b-gray-100">
        {/* TAB */}
        <div className="pl-4 w-full">
          <TabDeal />
        </div>
        {/* COUNT DOWN */}
        <Countdown targetDate="2025-01-01T23:59:59" />
      </div>
      <div className="px-4">
        {/* PRODUCT LIST */}
        <ProductCarousel />
      </div>
    </div>
  );
};
