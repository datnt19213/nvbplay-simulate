"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  resetSearch,
  setSearchKeyword,
  setTriggerApply,
} from "@/stores/search-slice";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import FilterTitle from "../atom/filter-title";
import CategoryDropdown from "../dropdowns/category-dropdown";
import CollectionDropdown from "../dropdowns/collection-dropdown";
import ProviderDropdown from "../dropdowns/provider-dropdown";
import { FilterSelectedTags } from "./filter-selected-tags";

interface IProps {
  className?: string;
  showTitle?: boolean;
  close?: () => void;
}

enum FilterType {
  Category = "Danh mục",
  Provider = "Hãng sản xuất",
  Price = "Giá",
  Color = "Màu sắc",
  Material = "Chất liệu",
  Collection = "Bộ sưu tập",
}

const FilterContainer: React.FC<IProps> = ({
  className,
  showTitle = true,
  close,
}) => {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetSearch());
    dispatch(setSearchKeyword(""));
    close?.();
  };

  const handleApply = () => {
    dispatch(setTriggerApply(true));
    close?.();
  };
  const items = [
    {
      title: FilterType.Collection,
      component: (
        <CollectionDropdown
          key={FilterType.Collection}
          title={FilterType.Collection}
        />
      ),
    },
    {
      title: FilterType.Provider,
      component: (
        <ProviderDropdown
          key={FilterType.Provider}
          title={FilterType.Provider}
        />
      ),
    },
    {
      title: FilterType.Category,
      component: (
        <CategoryDropdown
          key={FilterType.Category}
          title={FilterType.Category}
        />
      ),
    },
    // {
    //   title: FilterType.Price,
    //   component: (
    //     <PriceDropdown key={FilterType.Price} title={FilterType.Price} />
    //   ),
    // },
    // {
    //   title: FilterType.Color,
    //   component: (
    //     <ColorDropdown key={FilterType.Color} title={FilterType.Color} />
    //   ),
    // },
    // {
    //   title: FilterType.Material,
    //   component: (
    //     <MaterialDropdown
    //       key={FilterType.Material}
    //       title={FilterType.Material}
    //     />
    //   ),
    // },
  ];

  return (
    <div
      className={cn(
        "w-[272px] min-w-[272px] bg-white rounded-[8px]",
        className
      )}
    >
      {showTitle && <FilterTitle />}

      <FilterSelectedTags />

      <div className="px-[16px]">
        <Accordion
          type="multiple"
          autoFocus={false}
          defaultValue={items.map((i) => i.title)}
        >
          {items.map((i) => (
            <Fragment key={i.title}>{i.component}</Fragment>
          ))}
        </Accordion>
        <div className="flex gap-[8px] px-[16px] md:px-0 py-[8px] bg-white sticky bottom-0 z-10">
          <Button
            onClick={handleReset}
            variant={"grayPrimary"}
            className="w-full"
          >
            Xóa bộ lọc
          </Button>
          <Button onClick={handleApply} className="w-full md:hidden">
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
