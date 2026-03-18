"use client"

import Image from "@/components/base-components/images/image";
import { useScrollCenterOnScreen } from "@/hooks";
import { cn } from "@/lib/utils";
import { isFadeUpOnActive } from "@/utilities/checker-functions";
import React, { useRef } from "react";

const promotionTag = [
  {
    title: "#Cầu_lông",
    image: "/images/blog/home/tag-1.png",
  },
  {
    title: "#Khuyến_mãi",
    image: "/images/blog/home/right-side-1.png",
  },
  {
    title: "#Pickleball",
    image: "/images/blog/home/tag-3.png",
  },
  {
    title: "#art",
    image: "/images/blog/home/tag-4.jpg",
  },
  {
    title: "#cute",
    image: "/images/blog/home/tag-5.png",
  },
  {
    title: "#instamood",
    image: "/images/blog/home/tag-6.jpg",
  },
];

const populartag = [
  "#Love",
  "#beautifuldestinations",
  "#photographylovers",
  "#tbt",
  "#photooftheday",
  "#followme",
];

export const PopularTag = () => {
  const ref = useRef<any>(null);
  const isActive = useScrollCenterOnScreen(ref);

  const renderPopularTag = () => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-white rounded-lg p-4",
          isFadeUpOnActive(isActive)
        )}
      >
        {/* Ribbon */}
        <div className="absolute bg-gradient-to-r from-[#F187FB] to-[#0F68A9] top-4 -left-2 w-fit rounded-t-xl rounded-br-xl py-2 px-4 z-[10]">
          <div className="text-base font-semibold text-white">Tag nổi bật</div>{" "}
          <div className="absolute -bottom-[7px] -left-[0] border-l-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#6B14C3] z-[1]"></div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-20">
          {promotionTag?.map((pro, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-start gap-2"
            >
              <div className="aspect-square w-full rounded-lg overflow-hidden ">
                <Image
                  src={pro.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base font-medium text-black">{pro.title}</p>
            </div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-gray-200 my-4" />

        <div className="flex items-center justify-start flex-wrap gap-2">
          {populartag?.map((tag, index) => (
            <div
              key={index}
              className="py-1 px-2 bg-[#DBEEFF] text-[11px] text-[#0D5BB5] rounded-lg font-medium"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <>{renderPopularTag()}</>;
};
