import {cn} from "@/lib/utils";
import React, {FC, ReactNode} from "react";

type ButtonActiveCoinNVBProps = {
  onHandleClick: () => void;
  isActive: boolean;
  children: ReactNode;
};

const ButtonActiveCoinNVB: FC<ButtonActiveCoinNVBProps> = ({
  children,
  isActive,
  onHandleClick,
}) => {
  return (
    <div
      className={cn(
        "h-10 min-w-[100px] rounded-full w-fit py-0.5 px-4 transition-all flex items-center justify-center text-sm font-medium cursor-pointer",
        isActive ? "bg-txtthird text-white" : "bg-gray-primary text-gray-icon"
      )}
      onClick={() => onHandleClick && onHandleClick()}
    >
      {children}
    </div>
  );
};

export default ButtonActiveCoinNVB;
