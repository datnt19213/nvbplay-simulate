import Image from "@/components/base-components/images/image";
import IconCustom from "@/components/common-components/icon-custom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { COMMON_DATA } from "@/configs";
import React from "react";

const LiveCarousel = () => {
  const items = COMMON_DATA.live.map((live, index) => (
    <CarouselItem
      className="basis-1/2 desktop:basis-[13.80%] pl-1 desktop:pl-2"
      key={index}
    >
      <div className="relative rounded-lg overflow-hidden flex flex-col justify-between p-3 h-[286px] group cursor-pointer select-none">
        {/* IMAGE & OVERLAY */}
        <Image
          src={live.image}
          className="w-full h-full object-cover absolute inset-0 z-[-1] group-hover:scale-105 cursor-pointer ease-in-out transition-transform duration-300"
        />
        <div className="absolute inset-x-0 bottom-0 w-full h-[6.75rem] bg-gradient-to-b from-black/0 to-black/100" />
        {/* VIEW */}
        <div className="flex items-center rounded overflow-hidden text-[10px] uppercase text-sm text-white font-medium">
          <div className="flex items-center justify-center px-1 rounded-s bg-[#D93843]">
            Live
          </div>
          <div className="flex rounded-e items-center bg-[#474747]/50 pr-1 pl-0.5 gap-0.5">
            <IconCustom icon="tabler:user-filled" className="size-3.5" />
            {live.view}
          </div>
        </div>
        {/* INFO */}
        <div className="z-0">
          <div className="flex flex-col gap-1.5 text-white">
            <div className="flex items-center gap-1">
              <Image src={live.host.image} className="size-5" alt={live.name} />
              <span className="text-[11px] font-light">{live.host.name}</span>
            </div>
            <p className="text-sm line-clamp-2">{live.name}</p>
          </div>
        </div>
      </div>
    </CarouselItem>
  ));
  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
      }}
    >
      <CarouselContent className="-ml-1 desktop:-ml-2">{items}</CarouselContent>
    </Carousel>
  );
};

export default LiveCarousel;
