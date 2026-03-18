"use client";

import productImg from "@/assets/images/product-item.jpg";
import Image from "next/image";
import QuantityController from "./atom/quantity-controller";
import CallToAction4 from "./ctas/call-to-action-4";

const BottomSticky = () => {
  return (
    <div className="fixed hidden lg:block bottom-0 left-0 z-[999] w-full bg-white">
      <div className="container py-[12px] flex items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <div className="size-[56px] relative">
            <Image
              src={productImg}
              alt="product"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-[20px] items-start">
            {/* <ColorContainer
              colors={["red", "blue", "green"]}
              handleSetColor={() => {}}

            />
            <SizeContainer size="small" sizeItems={} showTutorial={false} /> */}
          </div>
        </div>
        <div className="flex items-center gap-[24px]">
          <QuantityController showLabel={false} />
          <CallToAction4 size="small" />
        </div>
      </div>
    </div>
  );
};

export default BottomSticky;
