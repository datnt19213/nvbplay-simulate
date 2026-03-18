import {Icon} from "@/components/common-components";
import {cn} from "@/lib/utils";
import React, {FC, HTMLAttributes, ReactNode} from "react";
import {children} from "solid-js";

type LocationActionProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
export const LocationAction: FC<LocationActionProps> = ({
  children,
  ...props
}) => {
  return (
    <div {...props}>
      <Icon icon="ph:map-pin" fontSize={24} />
      {children}
    </div>
  );
};

type StatusOrderProps = {
  status:
    | "pending"
    | "completed"
    | "draft"
    | "archived"
    | "canceled"
    | "requires_action";
  children: ReactNode;
};
export const StatusOrder: FC<StatusOrderProps> = ({status, children}) => {
  const isStatus =
    status === "canceled"
      ? "bg-red-50 text-red-500"
      : status === "completed"
        ? "bg-[#D7FAE0] text-[#079449]"
        : status === "archived"
          ? "bg-[#DBEEFF] text-[#0B74E5]"
          : status === "pending"
            ? " bg-[#FFF5C7] text-[#CC8100]"
            : status === "draft"
              ? " bg-[#FFF5C7] text-[#CC8100]"
              : status === "requires_action" &&
                "bg-gray-border text-txtsecondary";
  return (
    <div
      className={cn("px-3 py-1.5 rounded-full text-xs font-semibold", isStatus)}
    >
      {children}
    </div>
  );
};

type CtaWithIconProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export const CtaWithIcon: FC<CtaWithIconProps> = ({
  description,
  icon,
  title,
}) => {
  return (
    <div className="w-full flex gap-2 overflow-hidden cursor-pointer min-h-[55px] rounded-lg">
      <div className="-ml-2">{icon && icon}</div>
      <div className="flex flex-col py-2">
        <span className="text-sm font-semibold text-txtfifth">{title}</span>
        <span className="text-xs font-medium text-txtsecondary">
          {description}
        </span>
      </div>
    </div>
  );
};
