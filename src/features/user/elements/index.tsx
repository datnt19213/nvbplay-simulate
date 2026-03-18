import {cn} from "@/lib/utils";
import React, {FC, HTMLAttributes, ReactNode} from "react";

type ButtonCardProps = {
  label?: string;
  icon?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
export const ButtonCard: FC<ButtonCardProps> = ({
  label,
  icon,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center gap-2 h-full rounded-lg bg-white hover:bg-white text-sm font-semibold p-3 transition-all duration-200 cursor-pointer select-none",
        className
      )}
    >
      {icon && icon}
      {label && label}
    </div>
  );
};
