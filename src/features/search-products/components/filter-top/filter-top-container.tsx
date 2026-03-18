"use client";

import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import SortSelector from "./sort-selector";

const FilterTopContainer = () => {
  const searchSelector = useSelector((state: RootState) => state.search);
  const { totalItems, searchKeyword } = searchSelector;
  return (
    <div className="flex justify-between items-center">
      {searchKeyword ? (
        <div className="text-14-21-500 text-gray-icon px-[16px] py-[12px] md:px-0 md:py-0 w-full">
          Tìm thấy{" "}
          <span className="font-[700] text-txtprimary px-1">{totalItems}</span>{" "}
          kết quả cho{" "}
          <span className="font-[700] text-txtprimary">"{searchKeyword}"</span>
        </div>
      ) : (
        <div />
      )}

      <SortSelector className="hidden md:flex" />
    </div>
  );
};

export default FilterTopContainer;
