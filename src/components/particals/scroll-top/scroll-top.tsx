"use client";
import {Button} from "@/components/ui/button";
import {useScrollPosition} from "@/hooks/window-size";
import {cn} from "@/lib/utils";
import {ChevronUp} from "lucide-react";
import React from "react";

const ScrollTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };
  const {x, y} = useScrollPosition();
  return (
    <Button
      type="button"
      variant={"default"}
      size={"icon"}
      onClick={() => handleScrollTop()}
      className={cn(
        "fixed z-40 right-6 size-12 flex items-center justify-center shadow-xl overflow-hidden bg-txtthird text-white rounded-full hover:scale-125 transition-all duration-300 aspect-square",
        y > 1200
          ? "opacity-100 scale-100  bottom-20 duration-1000"
          : "opacity-0 scale-0 bottom-36 duration-1000"
      )}
    >
      <ChevronUp size={32} className="pointer-events-none" />
    </Button>
  );
};

export default ScrollTop;
