import { AppSubcription, BgMobileSubcription, logo_star } from "@/assets/icons";
import Image from "@/components/base-components/images/image";
import React from "react";

const BackgroundSection = () => {
  return (
    <div className="desktop:h-[400px] h-[522px] rounded-none desktop:rounded-lg overflow-hidden relative">
      <Image
        className="absolute w-full h-full object-cover z-0"
        src={BgMobileSubcription.src}
      />
      <div className="grid grid-cols-1 desktop:grid-cols-2 w-full h-full overflow-hidden">
        <div className="flex items-center justify-center">
          <div className="flex flex-col p-6 items-center desktop:items-start gap-5">
            <Image src={logo_star.src} className="h-[32px]" />
            <div className="flex flex-col gap-1 items-center desktop:items-start text-center desktop:text-left text-white z-[10]">
              <h3 className="text-lg desktop:text-xl font-bold">
                Tận hưởng đặc quyền <br /> dành riêng cho hội viên
              </h3>
              <p className="text-sm font-normal">
                Đăng ký hội viên để tận hưởng ưu đãi độc quyền và nâng tầm trải
                nghiệm mua sắm thể thao của bạn!
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full p-8 desktop:p-6">
          <Image
            src={AppSubcription.src}
            className="w-full h-full desktop:absolute bottom-0 "
            classNameImage="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundSection;
