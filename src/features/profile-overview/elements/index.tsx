import {cn} from "@/lib/utils";
import {dateFormator} from "@/utilities/date";
import {ChevronLeft, ChevronRight} from "lucide-react";
import React, {FC, HTMLAttributes, ReactNode, useState} from "react";

type MiniOutlineBtnProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;
export const MiniOutlineBtn: FC<MiniOutlineBtnProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span
      {...props}
      className={cn(
        "text-sm text-txtfifth w-fit text-nowrap font-semibold border border-gray-border rounded-full px-4 h-8 flex items-center",
        className
      )}
    >
      {children}
    </span>
  );
};

type IconBadgeProps = {
  children: ReactNode;
  className?: string;
  badgeClass?: string;
  badgeNumber?: number;
} & HTMLAttributes<HTMLDivElement>;

export const IconBadge: FC<IconBadgeProps> = ({
  children,
  className,
  badgeClass,
  badgeNumber,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "rounded-full relative bg-gray-border h-10 w-10 flex items-center justify-center",
        className
      )}
    >
      <span
        className={cn(
          "absolute z-[2] top-0 right-0 rounded-full bg-txtthird text-sm text-white w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold",
          badgeClass
        )}
      >
        {badgeNumber}
      </span>
      <div className="flex items-center justify-center relative z-[1]">
        {children}
      </div>
    </div>
  );
};
