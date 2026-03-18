"use client";
import Slider from "rc-slider";
import React, {useEffect, useRef, useState} from "react";
import {PriceFilter} from "./sub-components/price-filter";
import BrandsFilter from "./sub-components/brands-filter";
import ColorsFilter from "./sub-components/colors-filter";
import MaterialsFilter from "./sub-components/materials-filter";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css/free-mode";
import "swiper/css/pagination";

import {FreeMode} from "swiper/modules";
import {ArrowDown, ArrowUp, ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {COMMON_DATA, STYLES} from "@/configs";
import {useWindowSize} from "@/hooks";
import {KeyJSON, translate} from "@/utilities/translator";
import SelectInput from "@/components/base-components/input/select-input";
import SearchInput from "@/components/base-components/input/search-input";
import SortCheckbox from "@/features/search-products/components/filter-top/sort-checkbox";
import SortToggle from "./sub-components/sort-toggle";
import {Icon} from "@/components/common-components";

const BuilderFilterSort = () => {
  const filterListRef = useRef<HTMLDivElement>(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const [width, height] = useWindowSize();

  useEffect(() => {
    handleScroll();
  }, [width]);

  const handleLeftClick = () => {
    if (filterListRef.current) {
      filterListRef.current.scrollBy({left: -200, behavior: "smooth"});
    }
  };

  const handleRightClick = () => {
    if (filterListRef.current) {
      filterListRef.current.scrollBy({left: 200, behavior: "smooth"});
    }
  };

  const handleScroll = () => {
    if (filterListRef.current) {
      const {scrollLeft, scrollWidth, clientWidth} = filterListRef.current;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollWidth <= clientWidth + scrollLeft;

      const isScrollable = scrollWidth > clientWidth;

      setIsLeftDisabled(isAtStart || !isScrollable);
      setIsRightDisabled(isAtEnd || !isScrollable);
    }
  };
  return (
    <div className="min-h-[120px] px-5 py-4 flex flex-col desktop:gap-2 w-full border-b border-gray-border text-txtprimary bg-white max-w-full">
      <div className="w-full flex gap-6 ">
        <FilterSelectionList
          filterListRef={filterListRef}
          onScroll={handleScroll}
        />
        <div className="min-w-[84px] flex gap-1">
          <Button
            className={cn(
              "rounded-full flex items-center justify-center p-0 h-10 flex-shrink-0",
              STYLES.disableFocusVisible
            )}
            onClick={handleLeftClick}
            variant="outline"
            size="icon"
            disabled={isLeftDisabled}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            className={cn(
              "rounded-full flex items-center justify-center p-0 h-10 flex-shrink-0",
              STYLES.disableFocusVisible
            )}
            onClick={handleRightClick}
            variant="outline"
            size="icon"
            disabled={isRightDisabled}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
      </div>
      <div className="w-full">
        <BuilderSortable />
      </div>
    </div>
  );
};

export default BuilderFilterSort;

const BuilderSortable = () => {
  const [sortTogglePrice, setSortTogglePrice] = useState(false);
  return (
    <div className="flex flex-col desktop:flex-row desktop:items-center desktop:justify-between min-h-10 w-full desktop:gap-3">
      <div className=" desktop:flex items-center gap-3 w-full hidden">
        <span className="text-sm font-medium text-txtsecondary text-nowrap">
          {translate("sort_by")}
        </span>
        <div className="flex items-center gap-6 w-full">
          <SelectInput
            buttonClass="bg-white hover:bg-white"
            selectedValue={translate(COMMON_DATA.sort_by[0].name as KeyJSON)}
            className="desktop:max-w-[165px] w-full min-w-fit bg-white border border-gray-border rounded-full h-[40px]"
            options={COMMON_DATA.sort_by.map((item) => ({
              ...item,
              value: translate(item.name as KeyJSON),
              label: translate(item.name as KeyJSON),
            }))}
          />
          <hr className="w-[1px] h-8 bg-gray-border border-gray-border" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 desktop:hidden">
        <SortToggle
          options={COMMON_DATA.sort_toggle_by.map((item) => ({
            ...item,
            label: translate(item.name as KeyJSON),
            value: translate(item.name as KeyJSON),
          }))}
          icon={<Icon icon="tabler:point-filled" fontSize={12} />}
        />
        <div
          className="flex items-center gap-1 select-none cursor-pointer"
          onClick={() => setSortTogglePrice((prev) => !prev)}
        >
          <span className="text-sm font-medium text-txtsecondary text-nowrap">
            {translate("price")}
          </span>
          {sortTogglePrice ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        </div>
      </div>
      <SearchInput
        placeholder={translate("name_product_brand")}
        containerClassName="bg-white border borde-gray-border desktop:max-w-[20rem] min-w-[5rem] w-full"
      />
    </div>
  );
};

const FilterSelectionList = ({
  filterListRef,
  onScroll,
}: {
  filterListRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
}) => {
  return (
    <div
      ref={filterListRef}
      onScroll={onScroll}
      className="flex gap-2 items-center overflow-x-scroll scrollbar-none w-[calc(100%-108px)]"
    >
      <div className="flex flex-nowrap gap-2 w-0">
        <PriceFilter
          min={0}
          max={100000000}
          step={50000}
          onChange={() => null}
        />
        <BrandsFilter
          brandList={[]}
          init_price_filter_min={0}
          init_price_filter_max={100000000}
        />
        <ColorsFilter
          colorList={[]}
          init_price_filter_min={0}
          init_price_filter_max={100000000}
        />
        <MaterialsFilter
          materialList={[]}
          init_price_filter_min={0}
          init_price_filter_max={100000000}
        />
      </div>
    </div>
  );
};
