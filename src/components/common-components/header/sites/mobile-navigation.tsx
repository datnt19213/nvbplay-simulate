"use client";

import React, { ReactNode } from "react";
import { DesktopHeader } from "../widgets/desktop-header";
import { useMediaQuery } from "@/hooks/use-media-query";
import Banner from "../widgets/banner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Ellipsis, House } from "lucide-react";

type MobileNavigationHeaderProps = {
  childrenCenter?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const MobileNavigationHeader = (props: MobileNavigationHeaderProps) => {
  const { childrenCenter, leftIcon, rightIcon } = props;

  // Hooks
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Render
  if (isMobile) {
    return (
      <div className="flex flex-col w-full bg-white">
        <Banner />
        <div className="flex justify-between items-center px-5 py-2">
          {leftIcon ? (
            leftIcon
          ) : (
            <Link href="/">
              <House className="size-5 text-neutral-800 -ml-1" />
            </Link>
          )}

          {/* LOGO */}
          {childrenCenter ? (
            childrenCenter
          ) : (
            <Link href="/">
              <img
                src="/icons/nvbplay_logo.svg"
                className={cn(
                  "w-[75px] h-[28px] lg:w-auto lg:h-auto animate-fade-up ease-in-out duration-500 pointer-events-none"
                )}
              />
            </Link>
          )}

          {rightIcon ? rightIcon : <Ellipsis className="size-5" />}
        </div>
      </div>
    );
  }

  return <DesktopHeader />;
};
