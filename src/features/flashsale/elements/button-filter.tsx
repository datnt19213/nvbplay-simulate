import {cn} from "@/lib/utils";
import {Dot} from "lucide-react";
import React, {FC, HTMLAttributes, ReactNode} from "react";

type ButtonFilterProps = {
  label: string;
  icon?: ReactNode;
  reverse?: boolean;
  className?: string;
  active?: boolean;
  activeClass?: string;
} & HTMLAttributes<HTMLDivElement>;
export const ButtonFilter: FC<ButtonFilterProps> = ({
  label,
  icon,
  reverse,
  className,
  active,
  activeClass = "text-txtthird ",
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center cursor-pointer",
        reverse && "flex-row-reverse",
        active && activeClass,
        className
      )}
    >
      <span className="text-sm font-medium text-nowrap">{label}</span>
      {icon && icon}
    </div>
  );
};
