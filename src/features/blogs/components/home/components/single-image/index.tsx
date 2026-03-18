"use client";

import Image from "@/components/base-components/images/image";
import { useScrollCenterOnScreen } from "@/hooks";
import { cn } from "@/lib/utils";
import { isFadeUpOnActive } from "@/utilities/checker-functions";
import React, { useRef } from "react";

export const SingleImage = () => {
  const ref = useRef<any>(null);
  const isActive = useScrollCenterOnScreen(ref);

  return (
    <div ref={ref} className={cn(isFadeUpOnActive(isActive))}>
      <Image
        src={
          "https://s3-alpha-sig.figma.com/img/ce29/828f/16e0543c5e691f612c01a17e525d55e2?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QvF2ApkNa~LCRmN3yRSlnljcEQ5ko9gFpNbtD4pYt1bp4qH~YP4c3DeAThy4mkxi54465yrZEnbeWYgFP6Qh-kxME4T6DsoF2u-ScH2SWX164m0JpTU993C-28YIEnKuD0Po1tkE3SNuktSd4RRkv6TOFyXhd8QPBXu7ApANtX2MAuOqj3zvNyOwIobRyQNa2R5c2rM63LiCQf~P3wD2ZNxaeGzGTCjBRcqoqWAuV0fo6IBZK6d7H~VD-Dvpr6sDXewB3WRa1xvLeCbybIaJZZ3NniPUsnOkyVPuoQq5ZgjIWpZI8hamQWmGVuAh~xKVArRNpWFf7E79OUtLPynL9w__"
        }
        alt="single image"
        className="w-full h-full object-cover rounded-lg "
      />
    </div>
  );
};
