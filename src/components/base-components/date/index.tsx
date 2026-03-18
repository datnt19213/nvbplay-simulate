import {cn} from "@/lib/utils";
import {dateFormator} from "@/utilities/date";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {ReactNode, FC, useState} from "react";

type ViewMode = "daily" | "weekly" | "monthly" | "yearly";
type DateSlideProps = {
  onNext?: (value?: {start?: Date; end?: Date}) => void;
  onPrev?: (value?: {start?: Date; end?: Date}) => void;
  onDateChange?: (start: Date, end: Date) => void;
  currentViewMode?: ViewMode;
  className?: string;
  prevClass?: string;
  nextClass?: string;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  prevElement?: ReactNode;
  nextElement?: ReactNode;
  children?: (startDate?: Date, endDate?: Date) => React.ReactNode;
};
export const DateSlide: FC<DateSlideProps> = ({
  children,
  onDateChange,
  className,
  currentViewMode = "weekly",
  onNext,
  onPrev,
  prevElement,
  nextElement,
  disabledPrev = false,
  disabledNext = false,
  prevClass,
  nextClass,
}) => {
  const getNextDateRange = (current: Date, mode: ViewMode): [Date, Date] => {
    const start = new Date(current);
    const end = new Date(current);

    switch (mode) {
      case "daily":
        end.setDate(start.getDate() + 1);
        break;
      case "weekly":
        end.setDate(start.getDate() + 7);
        break;
      case "monthly":
        end.setMonth(start.getMonth() + 1);
        break;
      case "yearly":
        end.setFullYear(start.getFullYear() + 1);
        break;
    }
    onNext && onNext({start, end});
    onDateChange && onDateChange(start, end);
    return [start, end];
  };

  const getPrevDateRange = (current: Date, mode: ViewMode): [Date, Date] => {
    const end = new Date(current);
    const start = new Date(current);

    switch (mode) {
      case "daily":
        start.setDate(start.getDate() - 1);
        break;
      case "weekly":
        start.setDate(start.getDate() - 7);
        break;
      case "monthly":
        start.setMonth(start.getMonth() - 1);
        break;
      case "yearly":
        start.setFullYear(start.getFullYear() - 1);
        break;
    }
    onPrev && onPrev({start, end});
    onDateChange && onDateChange(start, end);
    return [start, end];
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, endDate] = getNextDateRange(currentDate, currentViewMode);

  const handlePrev = () => {
    const [newStartDate] = getPrevDateRange(startDate, currentViewMode);
    setCurrentDate(newStartDate);
  };

  const handleNext = () => {
    const [, newEndDate] = getNextDateRange(endDate, currentViewMode);
    setCurrentDate(newEndDate);
  };

  return (
    <div
      className={cn("h-10 w-full flex items-center justify-between", className)}
    >
      <button
        type="button"
        disabled={disabledPrev}
        className={cn(
          "h-10 w-10 rounded-full bg-white border border-gray-border flex items-center justify-center",
          prevClass
        )}
        onClick={handlePrev}
      >
        {prevElement || <ChevronLeft size={24} />}
      </button>
      {(children && children(startDate, endDate)) || (
        <span className="text-sm font-semibold">
          {currentViewMode !== "yearly" &&
            dateFormator(startDate, "dd/mm") +
              " - " +
              dateFormator(endDate, "dd/mm")}
          {currentViewMode === "yearly" &&
            dateFormator(startDate, "dd/mm/yy") +
              " - " +
              dateFormator(endDate, "dd/mm/yy")}
        </span>
      )}
      <button
        type="button"
        disabled={disabledNext}
        className={cn(
          "h-10 w-10 rounded-full bg-white border border-gray-border flex items-center justify-center",
          nextClass
        )}
        onClick={handleNext}
      >
        {nextElement || <ChevronRight size={24} />}
      </button>
    </div>
  );
};
