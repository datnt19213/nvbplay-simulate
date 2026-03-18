"use client";

import Image from "@/components/base-components/images/image";
import { useScrollCenterOnScreen } from "@/hooks";
import { cn } from "@/lib/utils";
import { isFadeUpOnActive } from "@/utilities/checker-functions";
import Link from "next/link";
import React, { useRef } from "react";

const hotCategory = [
  {
    title: "Cầu lông",
    image: "/images/blog/home/tag-1.png",
  },
  {
    title: "Pickleball",
    image: "/images/blog/home/pickleball.png",
  },
  {
    title: "Áo cầu lông",
    image: "/images/blog/home/badminton-3.png",
  },
];

export const HotCategory = () => {
  const ref = useRef<any>(null);
  const isActive = useScrollCenterOnScreen(ref);

  const renderHotCategory = () => {
    return (
      <div ref={ref} className={cn("relative", isFadeUpOnActive(isActive))}>
        {/* rectangle */}
        <div className="group-rectangle">
          <Image
            src="/images/blog/home/rectangle.png"
            alt=""
            className="w-[15px] h-[10px] absolute top-1 left-4"
            loading="lazy"
          />
          <Image
            src="/images/blog/home/rectangle.png"
            alt=""
            className="w-[15px] h-[10px] absolute top-1 left-7"
            loading="lazy"
          />

          <Image
            src="/images/blog/home/rectangle.png"
            alt=""
            className="w-[15px] h-[10px] absolute top-1 left-10"
            loading="lazy"
          />
          <Image
            src="/images/blog/home/rectangle.png"
            alt=""
            className="w-[15px] h-[10px] absolute top-1 left-[52px]"
            loading="lazy"
          />
          <Image
            src="/images/blog/home/rectangle.png"
            alt=""
            className="w-[15px] h-[10px] absolute top-1 left-[64px]"
            loading="lazy"
          />
          <Image
            src="/images/blog/home/rectangle.png"
            alt=""
            className="w-[15px] h-[10px] absolute top-1 left-[76px]"
            loading="lazy"
          />
          <Image
            src="/images/blog/home/rectangle.png"
            alt=""
            className="w-[15px] h-[10px] absolute top-1 left-[88px]"
            loading="lazy"
          />
          <Image
            src="/images/blog/home/rectangle.png"
            alt=""
            className="w-[15px] h-[10px] absolute top-1 left-[100px]"
            loading="lazy"
          />
          {/* <Image
              src="/images/blog/home/rectangle.png"
              alt=""
              className="w-[15px] h-[10px] absolute top-0 left-[112px]"
            /> */}
        </div>
        {/* rectangle */}

        {/* NVB Vector top */}
        <Image
          src="/images/blog/home/nvb-vector.png"
          alt=""
          className="w-[279px] h-[104px] absolute top-0 right-0 z-20"
          loading="lazy"
        />

        {/* Background image */}
        <Image
          src="/images/blog/home/Subtract.svg"
          alt=""
          className="w-full h-full z-10"
          loading="lazy"
        />

        {/* Content */}
        <div className="absolute max-w-[350px] top-14 left-4 z-40">
          <div className="flex justify-between items-center gap-2">
            <Image
              src="/images/blog/home/logo.png"
              alt=""
              className="w-fit h-fit z-10"
              loading="lazy"
            />

            <div className="bg-white bg-opacity-20 rounded-full py-2 px-3 flex justify-start items-center gap-2 z-50">
              <Image
                src="/images/blog/home/fire.png"
                alt=""
                className="w-fit h-fit z-10"
                loading="lazy"
              />
              <span className="font-semibold text-base text-white">
                Danh mục nổi bật
              </span>
            </div>
          </div>

          <div className="mt-4">
            {Array(2)
              .fill(1)
              .map((_, index) => (
                <div className="grid grid-cols-3 gap-4 mb-4" key={index}>
                  {hotCategory?.map((cat, index) => (
                    <Link
                      href={`/blog/${cat.title}`}
                      className="flex flex-col items-center justify-center gap-2"
                      key={index}
                    >
                      <div className="aspect-[1/0.8] w-full rounded-xl overflow-hidden">
                        <Image
                          src={cat.image}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-base font-medium text-white">
                        {cat.title}
                      </p>
                    </Link>
                  ))}
                </div>
              ))}
          </div>
        </div>

        {/* NVB Vector bottom */}
        <Image
          src="/images/blog/home/nvb-vector.png"
          alt=""
          className="w-[279px] h-[104px] absolute bottom-0 -left-10 z-20"
          loading="lazy"
        />
      </div>
    );
  };

  return <>{renderHotCategory()}</>;
};
