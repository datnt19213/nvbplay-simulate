"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RootState } from "@/stores";
import {
  FilterKey,
  FilterOption,
  toggleSelection,
} from "@/stores/search-slice";
import { X } from "lucide-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// {
//   category: {}
//   color = "color",
//   material = "material",
//   provider = "provider",
//   price = "price",
//   collection = "collection",
// }

const SelectedTags = () => {
  const dispatch = useDispatch();
  const {
    selectedCategories,
    selectedColors,
    selectedMaterials,
    selectedPrice,
    selectedProviders,
    selectedCollections,
  } = useSelector((state: RootState) => state.search);

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

    // Uncomment if you want to include price filtering
    // if (selectedPrice) {
    //   items.push({
    //     label: "price",
    //     value: `${FormatCurrency(selectedPrice.min)} - ${FormatCurrency(selectedPrice.max)}`,
    //   });
    // }

    return items;
  }, [
    selectedCategories,
    selectedColors,
    selectedMaterials,
    selectedProviders,
    selectedCollections,
    selectedPrice,
  ]);

  const handleRemoveTag = (key: FilterKey, option: FilterOption) => {
    dispatch(
      toggleSelection({
        key,
        option,
      })
    );
  };

  return (
    <div className="flex-1 overflow-x-auto max-w-[280px] px-[8px] ">
      <div
        style={{
          flex: "0 0 auto",
        }}
        className="flex gap-[8px] flex-nowrap md:flex-wrap "
      >
        {tags.length === 0 && (
          <span className="text-[#808089] text-14-21-400">
            Chưa áp dụng bộ lọc
          </span>
        )}
        {tags.map((i) => (
          <Badge
            className="rounded-full pr-[3px] flex items-center gap-2 border border-[#DDDDE3]"
            variant="outline"
            key={i.label + i.value}
            onClick={() => handleRemoveTag(i.key as FilterKey, i)}
          >
            <span className="text-[#27272A] font-medium text-14-21-400 ml-0.5 my-[0.1875rem] whitespace-nowrap cursor-pointer">
              {i.label}
            </span>
            <Button
              variant={"secondary"}
              size={"icon"}
              className="size-5 p-0.5 rounded-full bg-[#EBEBF0] hover:bg-[#EBEBF0] text-black"
            >
              <X className="text-[#515158]" size={20} />
            </Button>
          </Badge>
        ))}
        {/* <div className="whitespace-nowrap h-[32px] text-14-21-400 gap-[4px] px-[8px] flex items-center border border-[#dddde3] rounded-full cursor-pointer">
          {i.label}
          <button onClick={() => handleRemoveTag(i.key as FilterKey, i)}>
            <X className="text-[#515158]" size={20} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SelectedTags;
