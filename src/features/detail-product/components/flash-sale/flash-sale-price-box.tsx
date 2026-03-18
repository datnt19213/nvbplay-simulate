"use client";

import titleImage from "@/assets/images/flash-sale-title-bg.svg";
import useCountdown from "@/hooks/useCountDown";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import PriceBox from "../atom/price-box";

const FlashSalePriceBox = () => {
  const { hours, minutes, seconds, start } = useCountdown({
    seconds: 10,
  });
  useEffect(() => {
    start();
  }, []);

  const items = [
    {
      label: "hours",
      value: hours,
    },
    {
      label: "dot",
      value: ":",
    },
    {
      label: "minutes",
      value: minutes,
    },
    {
      label: "dot",
      value: ":",
    },
    {
      label: "seconds",
      value: seconds,
    },
  ];

  return (
    <div className="rounded-[8px] overflow-hidden border border-[#ffbdb0]">
      <div className="h-[44px] relative  flex items-center justify-end px-[16px]">
        <Image
          src={titleImage}
          alt="title"
          fill
          className="object-cover object-left"
        />
        <div className="relative flex text-[12px] leading-[18px] font-[600] items-center gap-[12px] text-white">
          <span>Kết thúc sau</span>
          <div className="flex gap-[4px] items-center">
            {items.map((i, index) => (
              <Fragment key={index}>
                {i.label === "dot" ? (
                  <span>{i.value}</span>
                ) : (
                  <div
                    key={i.label}
                    className="size-[28px]  font-[700] bg-gradient-to-t from-[#0e1c26] to-[#294861] rounded-[4px] flex justify-center items-center"
                  >
                    {i.value}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="p-[16px]">
        <PriceBox />
      </div>
    </div>
  );
};

export default FlashSalePriceBox;
