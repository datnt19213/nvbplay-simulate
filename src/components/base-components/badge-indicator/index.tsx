import React, {ReactNode} from "react";
import {clsx} from "clsx"; // Sử dụng clsx để quản lý class nếu cần

type BadgeIndicatorProps = {
  text?: string;
  icon?: React.ReactNode;
  indicatorColor?: string;
  textColor?: string;
  backgroundColor?: string;
  wrapperClass?: string;
  indicatorClass?: string;
  customStyles?: React.CSSProperties;
  children?: ReactNode;
  reverse?: boolean;
};

const BadgeIndicator: React.FC<BadgeIndicatorProps> = ({
  text = "Available",
  icon,
  indicatorColor = "bg-green-500",
  textColor = "text-green-800",
  backgroundColor = "bg-green-100",
  customStyles = {},
  children,
  indicatorClass,
  wrapperClass,
  reverse = false,
}) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit",
        backgroundColor,
        textColor,
        reverse && "flex-row-reverse",
        wrapperClass
      )}
      style={customStyles}
    >
      {icon ? (
        <span className={clsx("me-1", indicatorClass)}>{icon}</span>
      ) : (
        <span
          className={clsx(
            "w-2 h-2 me-1 rounded-full",
            indicatorColor,
            indicatorClass
          )}
        ></span>
      )}
      {children ? children : text}
    </span>
  );
};

export default BadgeIndicator;
