import {Icon} from "@/components/common-components";
import {cn} from "@/lib/utils";
import React, {FC, HTMLAttributes, ReactNode} from "react";
import {className} from "solid-js/web";

type AddNewItemProps = {
  children: ReactNode;
  icon?: ReactNode;
  textClassName?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
const AddNewItem: FC<AddNewItemProps> = ({
  children,
  icon,
  textClassName,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "border border-dashed flex items-center justify-center gap-2 h-full rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer",
        className
      )}
      {...props}
    >
      {(icon && icon) || (
        <Icon icon={"ph:plus"} fontSize={24} className="text-txtsecondary" />
      )}
      <div className={cn("font-semibold text-txtsecondary", textClassName)}>
        {children}
      </div>
    </div>
  );
};

export default AddNewItem;
