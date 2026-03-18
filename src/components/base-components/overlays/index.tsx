import {cn} from "@/lib/utils";
import React, {FC, ReactNode} from "react";
import {children} from "solid-js";

type OverlayTransparentProps = {
  open: boolean;
  className?: string;
  onClick?: () => void;
  opacity?: number;
};
export const OverlayTransparent: FC<OverlayTransparentProps> = ({
  open = true,
  className,
  opacity = 0.1,
  onClick,
}) => {
  if (open) {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  } else {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "auto";
    }
  }
  return (
    <div
      style={{
        opacity: `rgba(255,255,255,${opacity})`,
      }}
      onClick={() => onClick && onClick()}
      className={cn(
        `fixed top-0 left-0 w-screen h-screen z-[9999]`,
        open
          ? "visible opacity-100 w-dvw h-dvh pointer-events-auto select-none"
          : "opacity-0 hidden invisible h-0 w-0 pointer-events-none select-auto",
        className
      )}
    ></div>
  );
};

type DarkOverlayTransparentProps = {
  children?: ReactNode;
} & OverlayTransparentProps;
export const DarkOverlayTransparent: FC<DarkOverlayTransparentProps> = ({
  open = true,
  className,
  children,
  opacity = 0.5,
  onClick,
}) => {
  if (open) {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  } else {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "auto";
    }
  }
  return (
    <div
      style={{
        backgroundColor: `rgba(0,0,0,${opacity})`,
      }}
      onClick={() => onClick && onClick()}
      className={cn(
        `absolute top-0 left-0 w-full h-full z-[1]  text-white flex items-center justify-center text-sm font-semibold`,
        open
          ? "visible opacity-100 w-full h-full pointer-events-auto select-none"
          : "opacity-0 hidden invisible h-0 w-0 pointer-events-none select-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
