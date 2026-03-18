"use client";

import comboTitleBg from "@/assets/icons/hot-deal-title.svg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import useMediaQueryScreen from "@/hooks/useMediaQueryScreen";
import QuantityController from "../atom/quantity-controller";
import CallToAction3 from "../ctas/call-to-action-3";
import MobileCallToAction3 from "../ctas/mobile-call-to-action-3";
import SelectedProductItem from "../selected-product-item";
import ComboProductItem from "./combo-product-item";

const images = [
  {
    src: "/images/product_image.png",
    alt: "a",
  },
  {
    src: "/images/product_image.png",
    alt: "a",
  },
  {
    src: "/images/product_image.png",
    alt: "a",
  },
  {
    src: "/images/product_image.png",
    alt: "a",
  },
];

const ComboProductsContainer = () => {
  const { isMobile } = useMediaQueryScreen();
  const SHOWED_AMOUNT = isMobile ? 2 : 2.7;

  return (
    <div className="rounded-[8px] overflow-hidden">
      {/* <div className="h-[44px] relative  flex items-center px-[16px]">
        <Image src={comboTitleBg} alt="title" fill className="object-cover" />
        <div className="font-[600] relative text-white text-[16px] leading-[24px]">
          Mua kèm deal sốc
        </div>
      </div>
      <div className="relative p-[16px]">
        <Swiper slidesPerView={SHOWED_AMOUNT}>
          {images.map((_, index) => (
            <SwiperSlide key={index}>
              <ComboProductItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="p-[16px] space-y-[20px]">
        <div className="flex justify-between text-[14px] leading-[21px]">
          <span className="text-[#38383d] font-[600]">Đã lựa chọn</span>
          <span className="text-[#64646d]">2 món</span>
        </div>
        <div className="space-y-[20px]">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <SelectedProductItem key={index} />
            ))}
        </div>
      </div>     */}
      <QuantityController className="hidden md:flex" />
      <CallToAction3 className="hidden md:flex" />
      <MobileCallToAction3 />
      {/* <CallToActionPreOrder /> */}
      {/* <CallToAction4 className="hidden md:flex" />
      <MobileCallToAction4 /> */}
      {/* <div className="mt-[20px] space-y-[12px]">
        <span className="font-[600] text-[#38383d]">Tags: </span>
        <div className="flex flex-wrap gap-[4px]">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <span
                className="py-[4px] px-[8px] rounded-[8px] bg-[#dbeeff] text-[#0d5bb5] text-[12px] leading-[18px] font-[600]"
                key={index}
              >
                Áo cầu lông cần thơ
              </span>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default ComboProductsContainer;
