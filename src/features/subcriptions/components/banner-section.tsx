import { NVBPlay_Subcription, Subcription } from "@/assets/icons";
import Image from "@/components/base-components/images/image";
import React from "react";

const BannerSection = () => {
  return (
    <div className="w-full h-[360px] relative flex flex-col items-center justify-center rounded-none desktop:rounded-lg overflow-hidden">
      <div className="absolute w-full h-full inset-0">
        <Image src={Subcription.src} className="w-full h-full z-0" />
      </div>
      <div className="flex flex-col items-center gap-8 justify-center z-10">
        <Image src={NVBPlay_Subcription.src} className="h-[153px]" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center w-[343px]">
            <div className="text-white text-[32px] leading-[48px] font-bold">
              Hội viên NVB Play
            </div>
            <div className="text-white text-base font-medium text-center">
              Tận hưởng ưu đãi mọi nhãn hàng,
              <br /> đặc quyền không giới hạn cho bạn!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
