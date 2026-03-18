import { flash, tag_deal } from "@/assets/images";
import Image from "@/components/base-components/images/image";
import React from "react";
const TagBanner = () => {
  return (
    <div className="absolute -top-1 desktop:-top-1.5 z-10 w-full flex flex-col items-center">
      <div className="relative">
        <Image src={tag_deal.src} className="desktop:w-[448px]" />
        <div className="absolute w-full inset-0 flex justify-center items-center gap-2">
          <p className="text-white text-sm uppercase font-semibold">
            GIỜ VÀNG GIÁ SỐC
          </p>
          <div className="flex items-center">
            <img src={flash.src} className="z-[1] -mr-3.5 size-7" />
            <div className=" bg-gradient-to-r from-[#F5ED90] via-[#FFF0DD] to-[#FFDD97] pl-5 p-0.5 rounded-e-full">
              <p className="text-xs z-0 bg-gradient-to-r from-[#1B212B] via-[#1C222D] to-[#0F1114] py-0.5 -ml-3 px-2 rounded-e-full text-[9px] font-semibold text-[#FCFBBA]">
                10:00 - 12:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagBanner;
