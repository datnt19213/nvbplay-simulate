"use client";

import Image from "@/components/base-components/images/image";
import { useScrollCenterOnScreen } from "@/hooks";
import { cn } from "@/lib/utils";
import { isFadeUpOnActive } from "@/utilities/checker-functions";
import React, { useRef } from "react";

export const Promotion = ({
  image,
  className,
}: {
  image?: string;
  className?: string;
}) => {
  const ref = useRef<any>(null);
  const isActive = useScrollCenterOnScreen(ref);

  const renderPromotion = () => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-full rounded-lg overflow-hidden",
          className,
          isFadeUpOnActive(isActive)
        )}
      >
        <Image src={image} alt="" loading="lazy" />
      </div>
    );
  };

  return <>{renderPromotion()}</>;
};
