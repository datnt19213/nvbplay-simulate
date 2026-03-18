import {cn} from "@/lib/utils";
import React, {FC, ReactNode} from "react";

type FlashCategoryItemProps = {
  icon: ReactNode;
  title: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
};
const FlashCategoryItem: FC<FlashCategoryItemProps> = ({
  icon,
  title,
  active,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={cn(
        "px-4 py-2 w-fit flex items-center justify-center rounded-lg gap-2 cursor-pointer select-none transition-all duration-200",
        active ? "bg-txtthird text-white" : "bg-gray-border text-gray-icon",
        className
      )}
    >
      <div className="flex items-center justify-center h-full">{icon}</div>
      <span className="text-sm font-semibold ">{title}</span>
    </div>
  );
};

export default FlashCategoryItem;
