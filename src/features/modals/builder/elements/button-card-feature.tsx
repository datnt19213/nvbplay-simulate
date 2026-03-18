import {cn} from "@/lib/utils";
import React, {FC, HTMLAttributes, ReactNode} from "react";

type ButtonCardFeatureProps = {
  icon?: ReactNode;
  title: ReactNode;
  description?: string;
  className?: string;
  titleClass?: string;
  descriptionClass?: string;
} & HTMLAttributes<HTMLDivElement>;
const ButtonCardFeature: FC<ButtonCardFeatureProps> = ({
  className,
  title,
  description,
  icon,
  titleClass,
  descriptionClass,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "bg-gray-primary w-full aspect-[1.25] rounded-lg flex flex-col items-center justify-center px-5 py-2 gap-1 cursor-pointer",
        className
      )}
    >
      {icon && icon}
      <div
        className={cn(
          "text-txtfifth/90 text-sm font-semibold text-center",
          titleClass
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          "text-gray-icon/80 text-sm font-[400] text-center",
          descriptionClass
        )}
      >
        {description}
      </div>
    </div>
  );
};

export default ButtonCardFeature;
