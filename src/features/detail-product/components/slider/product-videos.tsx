"use client";

import useMediaQueryScreen from "@/hooks/useMediaQueryScreen";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

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
  {
    src: "/images/product_image.png",
    alt: "a",
  },
];

interface IProps {
  className?: string;
}

const ProductVideos: React.FC<IProps> = ({ className }) => {
  const { isMobile } = useMediaQueryScreen();
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const SHOWED_AMOUNT = isMobile ? 2.8 : 3.5;

  const nextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className={cn("space-y-[12px]", className)}>
      <div className="font-[600] text-[20px] leading-[30px] text-[#27272a]">
        Video về sản phẩm
      </div>
      <div className="relative w-full">
        <Swiper
          ref={swiperRef}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          slidesPerView={SHOWED_AMOUNT}
        >
          {images.map((_, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  width: isMobile ? `120px` : "168px",
                }}
                className="md:w-[168px] aspect-[0.55] rounded-[8px] overflow-hidden  bg-red-300 relative border-2"
              >
                <Image
                  src={"/images/product_image.png"}
                  alt={"a"}
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <>
          <button
            disabled={activeIndex === 0}
            onClick={prevSlide}
            className="z-10 size-[40px] flex justify-center items-center bg-white rounded-full absolute top-1/2 -translate-y-1/2 left-[2px] -translate-x-1/2 disabled:opacity-50"
          >
            <Icon
              className="text-[#ff3f1a]"
              icon="material-symbols:chevron-left"
              width="24"
              height="24"
            />
          </button>
          <button
            disabled={activeIndex === Math.floor(images.length / SHOWED_AMOUNT)}
            onClick={nextSlide}
            className="z-10 size-[40px] flex justify-center items-center bg-white rounded-full absolute top-1/2 -translate-y-1/2 -right-[2px] translate-x-1/2 disabled:opacity-50"
          >
            <Icon
              className="text-[#ff3f1a]"
              icon="material-symbols:chevron-right"
              width="24"
              height="24"
            />
          </button>
        </>
      </div>
    </div>
  );
};

export default ProductVideos;
