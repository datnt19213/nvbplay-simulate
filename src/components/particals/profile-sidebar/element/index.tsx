import {Icon} from "@/components/common-components";
import {cn} from "@/lib/utils";
import Link from "next/link";
import React, {FC, ReactNode} from "react";

type ProfileSidebarItemProps = {
  icon: string | ReactNode;
  title: string;
  isActive?: boolean;
  className?: string;
  handleClickSidebar?: () => void;
};

export const ProfileSidebarItem: FC<ProfileSidebarItemProps> = ({
  icon,
  title,
  className,
  isActive,
  handleClickSidebar,
}) => {
  return (
    <div
      className={cn(
        "h-12 w-full flex items-center gap-4 pl-4 select-none cursor-pointer",
        className,
        isActive &&
          "bg-gradient-to-r from-[#0B74E529] to-transparent border-l-2 border-blue-primary"
      )}
      onClick={() => handleClickSidebar && handleClickSidebar()}
    >
      {typeof icon === "string" && (
        <Icon
          icon={`${icon}`}
          fontSize={24}
          fill={isActive ? "#0B74E5" : "#38383D"}
          className={isActive ? "text-blue-primary" : "#38383D"}
        />
      )}
      {typeof icon !== "string" && icon}
      <span
        className={cn(
          "text-sm font-semibold transition-all duration-300",
          isActive ? "text-blue-primary" : "text-txtfifth"
        )}
      >
        {title}
      </span>
    </div>
  );
};
