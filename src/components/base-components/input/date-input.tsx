"use client";
import React, {ReactNode} from "react";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FC} from "react";
import {DateRange} from "react-day-picker";

type DateInputProps = {
  mode: "single" | "range" | "multiple" | "default";
  onChange?: (value: any) => void;
  value?: Date | Date[] | DateRange | undefined | any;
  className?: string;
  placeholder?: string;
  placeholderClass?: string;
  iconPosition?: "start" | "end";
  icon?: ReactNode;
  iconClass?: string;
  calendarClass?: string;
  wrapperCalendarClass?: string;
};

const DateInput: FC<DateInputProps> = ({
  mode,
  onChange,
  value,
  className,
  placeholder = "dd/mm/yyyy",
  placeholderClass,
  iconPosition,
  icon,
  iconClass = "text-gray-icon",
  calendarClass,
  wrapperCalendarClass,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "text-left font-normal gap-2 hover:bg-transparent justify-between !px-3",
            className,
            iconPosition === "start" ? "flex-row" : "flex-row-reverse",
            !value && "text-muted-foreground"
          )}
        >
          {icon || <CalendarIcon className={cn(iconClass)} size={24} />}
          {value ? (
            format(value, "dd/MM/yyyy")
          ) : (
            <div
              className={cn(
                "text-[#808089] font-medium text-sm w-full text-left",
                placeholderClass
              )}
            >
              {placeholder}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", wrapperCalendarClass)}>
        <Calendar
          className={cn("w-full", calendarClass)}
          mode={mode}
          selected={value}
          onSelect={onChange && onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;
