"use client";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {translate} from "@/utilities/translator";
import {FC, HTMLAttributes, ReactNode} from "react";

type FilterDropDownProps = {
  trigger: ReactNode;
  title: string;
  children?: ReactNode;
  triggerClass?: HTMLAttributes<HTMLButtonElement>["className"];
  contentClass?: HTMLAttributes<HTMLButtonElement>["className"];
  onReset?: () => void;
};

export const FilterDropDown: FC<FilterDropDownProps> = ({
  children,
  trigger,
  title,
  contentClass = "max-w-[2]",
  triggerClass,
  onReset,
}) => {
  return (
    <Popover>
      <PopoverTrigger className={cn("w-fit flex-shrink-0", triggerClass)}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "flex mt-3 text-txtprimary flex-col shadow-[0px_-5px_32px_rgba(0,0,0,0.05)] bg-white border-gray-border gap-2 relative before:h-4 before:w-4 before:border-l before:border-t before:rotate-45 before:bg-white before:absolute before:content-[''] before:top-[-8px] before:left-[40px]",
          contentClass
        )}
      >
        <div className="flex justify-between ">
          <span className="text-sm font-semibold">{title}</span>
          <span
            className="text-sm font-semibold select-none text-txtthird min-w-11 cursor-pointer"
            onClick={() => onReset && onReset()}
          >
            {translate("reset")}
          </span>
        </div>
        {children}
      </PopoverContent>
    </Popover>
  );
};
