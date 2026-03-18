import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
}

const FilterTitle: React.FC<IProps> = ({
  title = "Bộ lọc tìm kiếm",
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "text-16-24-600 font-semibold text-[#27272A] md:p-[16px] px-[16px] flex gap-[12px] items-center",
        className
      )}
    >
      <Filter className="size-4" />
      {title}
    </div>
  );
};

export default FilterTitle;
