"use client";
import {Icon} from "@/components/common-components";
import {cn} from "@/lib/utils";
import {translate} from "@/utilities/translator";
import React, {FC, ReactNode} from "react";

type SettingsItemProps = {
  title: any;
  description: any;
  leftIcon: ReactNode;
  rightElement: ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};
export const SettingItem: FC<SettingsItemProps> = ({
  leftIcon,
  description,
  rightElement,
  title,
  active = true,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      aria-disabled={!active}
      className={cn(
        "border-b py-4 border-gray-border flex items-center justify-between transition-all duration-500",
        active
          ? "opacity-100 pointer-events-auto select-auto"
          : "opacity-50 pointer-events-none select-none",
        className
      )}
    >
      <div className="flex items-center gap-3 w-fit">
        {typeof leftIcon === "string" ? (
          <Icon icon={`${leftIcon}`} fontSize={24} />
        ) : (
          leftIcon
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-sm">
            {translate(title) || ""}
          </span>
          <span className="fontmedium text-xs text-gray-icon">
            {translate(description) || ""}
          </span>
        </div>
      </div>
      {rightElement}
    </div>
  );
};
