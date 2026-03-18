import {cn} from "@/lib/utils";
import React, {CSSProperties, FC, HTMLAttributes, ReactNode} from "react";

type BlendButtonProps = {
  children: ReactNode;
  borderWidth?: number;
  borderColors?: string;
  borderDegrees?: number;
  borderStyles?: CSSProperties;
  backgroundColors?: string;
  backgroundDegrees?: number;
  backgroundStyles?: CSSProperties;
  backgroundClass?: string;
  backgroundImage?: string;
  containerClass?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
export const BlendButton: FC<BlendButtonProps> = ({
  children,
  borderWidth = 2,
  borderColors,
  backgroundColors,
  borderDegrees = 90,
  backgroundDegrees = 90,
  borderStyles,
  backgroundStyles,
  className,
  backgroundClass,
  backgroundImage,
  containerClass,
  ...props
}) => {
  return (
    <div
      style={{
        background: `linear-gradient(${borderDegrees}deg, ${borderColors})`,
        padding: `${borderWidth}px`,
        ...borderStyles,
      }}
      className={cn(" relative rounded-lg", containerClass)}
      {...props}
    >
      <div
        className={cn(
          "rounded-md w-full h-full px-3 py-2 flex items-center justify-center",
          backgroundClass
        )}
        style={{
          left: `${borderWidth}px`,
          top: `${borderWidth}px`,
          background: backgroundImage
            ? `url(${backgroundImage})`
            : `linear-gradient(${backgroundDegrees}deg, ${backgroundColors})`,
          ...backgroundStyles,
        }}
      >
        <div
          className={cn(
            "text-white flex items-center justify-center",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
