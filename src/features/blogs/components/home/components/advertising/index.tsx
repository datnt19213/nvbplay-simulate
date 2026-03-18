import Image from "@/components/base-components/images/image";
import React from "react";
import { BrandCarousel } from "./brand-carousel";

export const AdvertisingSecion = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FF3F1A] to-[#F09840] min-h-[22.5rem] rounded-lg">
      {/* Header image */}
      <div className="">
        <Image
          src="/images/blog/home/advertising-heading.png"
          alt=""
          className="absolute top-2 left-0"
        />

        <Image
          src="/images/blog/home/nvb-vector.png"
          alt=""
          className="absolute top-0 left-[50%] translate-x-[-50%] right-0 w-fit h-fit"
        />

        <div className="absolute top-2 -right-2 bg-white rounded-lg px-4 py-2">
          <span className="text-[#FF3F1A] text-base font-semibold">
            Xem tất cả
          </span>
        </div>
      </div>

      {/* Carousel */}
      <div className="mt-16 pl-4 py-4">
        <BrandCarousel />
      </div>
    </div>
  );
};
