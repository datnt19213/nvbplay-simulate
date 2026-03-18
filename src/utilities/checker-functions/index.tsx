import React from "react";

export const isFadeUpOnActive = (
  isActive: boolean,
  isDelay?: boolean
): string => {
  return isActive
    ? `translate-y-0 opacity-100 duration-1000 transition-all ${isDelay && "delay-300"}`
    : "translate-y-10 opacity-0 duration-1000 transition-all";
};
