import {cn} from "@/lib/utils";
import {ValueLabelProps} from "@/types";
import React, {FC, ReactNode} from "react";

interface SortToggleProps {
  disableIcon?: string[];
  options: ValueLabelProps[];
  onChange?: (value: ValueLabelProps) => void;
  containerClass?: string;
  itemClass?: string;
  icon?: ReactNode;
  disabledLastIcon?: boolean;
}
const SortToggle: FC<SortToggleProps> = ({
  onChange,
  options,
  containerClass,
  itemClass,
  disableIcon,
  icon,
  disabledLastIcon,
}) => {
  return (
    <div className={cn("flex items-center gap-1 h-11", containerClass)}>
      {options.map((option, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-2 text-sm text-txtfifth select-none cursor-pointer font-medium pr-0.5",
            itemClass
          )}
          onClick={() => onChange && onChange(option)}
        >
          {option.label}
          {(disableIcon && disableIcon.includes(option.value)) ||
          (disabledLastIcon && index === options.length - 1) ? (
            <></>
          ) : (
            icon
          )}
        </div>
      ))}
    </div>
  );
};

export default SortToggle;
