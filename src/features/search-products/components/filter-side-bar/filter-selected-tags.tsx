"use client";

import React, { useMemo } from "react";
import SelectedTags from "../filter-top/seleteced-tags";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { clearAllSelected } from "@/stores/search-slice";

export const FilterSelectedTags = () => {
  const {
    selectedCategories,
    selectedColors,
    selectedMaterials,
    selectedPrice,
    selectedProviders,
    selectedCollections,
  } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const tags = useMemo(() => {
    const items = [
      ...selectedCategories.map((i) => ({
        ...i,
        key: "selectedCategories",
      })),

      ...selectedCollections.map((i) => ({
        ...i,
        key: "selectedCollections",
      })),
    ];

    return items;
  }, [
    selectedCategories,
    selectedColors,
    selectedMaterials,
    selectedProviders,
    selectedCollections,
    selectedPrice,
  ]);

  const handleClearAllSelected = () => {
    dispatch(clearAllSelected());
  };

  return (
    <>
      {tags?.length > 0 && <SelectedTags />}

      {tags.length > 0 && (
        <div className="px-[16px] mt-2">
          <span
            className="text-[#D93843] text-14-21-400 cursor-pointer"
            onClick={handleClearAllSelected}
          >
            Xóa bộ lọc
          </span>
        </div>
      )}

      <div className="px-[16px] mt-4">
        <div className="border-b" />
      </div>
    </>
  );
};
