"use client"

import React, { useRef } from "react";
import { BestSellCard } from "../best-sell-card";
import { useScrollCenterOnScreen } from "@/hooks";
import { cn } from "@/lib/utils";
import { isFadeUpOnActive } from "@/utilities/checker-functions";

export const BestSeller = () => {
  const ref = useRef<any>(null);
  const isActive = useScrollCenterOnScreen(ref);

  const renderBestSellCard = () => {
    return (
      <div
        ref={ref}
        className={cn("bg-white p-4 rounded-lg", isFadeUpOnActive(isActive))}
      >
        <div className="mt-5 mb-8 flex flex-col justify-center items-center gap-2">
          <p className="text-center text-[#348756] text-3xl font-bold">
            bán chạy
          </p>
          <p className="text-center text-[#808089] text-base italic font-medium">
            Tổng hợp các sản phẩm bán chạy
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array(4)
            .fill(1)
            .map((_, index) => (
              <BestSellCard key={index} />
            ))}
        </div>
      </div>
    );
  };
  return <>{renderBestSellCard()}</>;
};
