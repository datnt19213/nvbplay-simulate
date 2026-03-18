"use client";

import fullStar from "@/assets/icons/full-star-icon.svg";
import strokeStar from "@/assets/icons/stroke-star-icon.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type RatingStarProps = {
  amount: number; // Số lượng ngôi sao đạt được
  total: number;
  width?: number;
  height?: number;
  className?: string;
};

const RatingStar: React.FC<RatingStarProps> = ({
  amount,
  total,
  width = 14,
  height = 14,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-[2px]", className)}>
      {[...Array(total)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Image
            key={index}
            src={starValue <= amount ? fullStar : strokeStar}
            alt="star"
            width={width}
            height={height}
          />
        );
      })}
    </div>
  );
};

export default RatingStar;
