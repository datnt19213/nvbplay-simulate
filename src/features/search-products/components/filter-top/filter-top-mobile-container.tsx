import { cn } from "@/lib/utils";
import FilterSheet from "../sheets/filter-sheet";
import SelectedTags from "./seleteced-tags";
import SortCheckbox from "./sort-checkbox";

interface IProps {
  className?: string;
}

const FilterTopMobileContainer: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex gap-[8px] divide-x items-center w-full px-[16px] py-[12px] bg-white border-b border-[#ebebf0]",
          className
        )}
      >
        <FilterSheet />
        <SelectedTags />
      </div>
      <SortCheckbox />
    </div>
  );
};

export default FilterTopMobileContainer;
