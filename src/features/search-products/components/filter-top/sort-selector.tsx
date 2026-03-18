"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { setSelectedSort, SORT_OPTIONS } from "@/stores/search-slice";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  className?: string;
}

const SortSelector: React.FC<IProps> = ({ className }) => {
  const dispatch = useDispatch();
  const selectedSort = useSelector(
    (state: RootState) => state?.search?.selectedSort
  );

  const handleChangeSort = (value: string) => {
    dispatch(setSelectedSort(value));
  };

  return (
    <div
      className={cn("text-14-21-500 gap-[8px] flex items-center", className)}
    >
      <span className="text-[#808089] whitespace-nowrap">Sắp xếp theo</span>
      <Select value={selectedSort} onValueChange={handleChangeSort}>
        <SelectTrigger className="w-[180px] rounded-full">
          <SelectValue placeholder="Sắp xếp theo" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.id} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelector;
