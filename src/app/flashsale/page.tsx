import ComingSoon from "@/components/base-components/cta/coming-soon";
import {FlashSaleProductList} from "@/features/flashsale";
import FlashsaleFilter from "@/features/flashsale/components/flashsale-filter";
import React from "react";

const FlashSale = () => {
  return (
    <div className="flex flex-col w-full">
      <FlashsaleFilter />
      <FlashSaleProductList />
    </div>
  );
};

export default FlashSale;
