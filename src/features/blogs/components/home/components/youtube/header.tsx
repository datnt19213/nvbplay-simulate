"use client";

import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import { useScrollCenterOnScreen } from "@/hooks";
import { cn } from "@/lib/utils";
import { isFadeUpOnActive } from "@/utilities/checker-functions";
import { MoveUpRight } from "lucide-react";
import React, { useRef } from "react";

export const NvbYoutubeHeader = () => {
  const ref = useRef<any>(null);
  const isActive = useScrollCenterOnScreen(ref);

  return (
    <div
      ref={ref}
      className={cn(
        "w-full flex justify-between items-center",
        isFadeUpOnActive(isActive)
      )}
    >
      <Image
        src={"/images/blog/home/nvb_ytb.png"}
        alt="logo"
        className="w-fit h-fit"
        loading="lazy"
      />
      <Button
        className="bg-[#EBEBF0] text-[#64646D] hover:bg-neutral-200 flex items-center gap-2"
        asChild
      >
        <div className="flex items-center gap-1">
          <span>NVBTube</span>
          <MoveUpRight className="size-4" />
        </div>
      </Button>
    </div>
  );
};
