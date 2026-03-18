import Image from "@/components/base-components/images/image";
import React from "react";
import { HelpCenterSearchGroup } from "./search-group";

export const popularKeywords = [
  "Vận chuyển",
  "Thanh toán đơn hàng",
  "Hội viên NVB PLay",
  "Hội viên NVB PLay",
];

export const HelpCenterBanner = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 w-full h-[26.25rem]">
        <Image
          src="/images/help-center-banner.jpg"
          alt="help-center-banner"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 w-full h-[26.25rem] bg-[#132638B2]/70"></div>
      <div className="absolute inset-0 w-full h-[26.25rem] flex flex-col items-center justify-center gap-10">
        <div className="text-white text-center max-w-[23.4375rem] ">
          <h1 className="text-5xl font-bold text-[1.5rem] leading-10  md:text-[2rem] md:leading-[3rem] text-center ">
            Cần hỗ trợ? <br /> Chúng tôi luôn sẵn sàng!
          </h1>
        </div>

        <HelpCenterSearchGroup />

        <div className="flex flex-col justify-center items-center gap-6">
          <div className="text-white text-base font-medium">
            Từ khóa phổ biến
          </div>
          <div className="flex justify-center items-center flex-wrap gap-3 overflow-x-scroll scrollbar-none md:overflow-hidden">
            {popularKeywords.map((keyword, index) => (
              <div
                key={index}
                className="text-base font-medium bg-white/20 px-3 py-2 rounded-full"
              >
                <div className="text-white text-nowrap whitespace-nowrap">
                  {keyword}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
