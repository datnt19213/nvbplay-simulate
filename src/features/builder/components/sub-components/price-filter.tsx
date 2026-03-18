"use client";
import React, {FC, useEffect, useState} from "react";
import {FilterDropDown} from "../../elements/dropdown";
import {translate} from "@/utilities/translator";
import {ChevronDown} from "lucide-react";
import {Input} from "@/components/ui/input";
import {formatNumber} from "@/utilities/formator";
import {cn} from "@/lib/utils";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores";
import {SlideRange} from "@/components/base-components/slider";
import {STYLES} from "@/configs";
import {setFilterBuilder} from "@/stores/builder-slice";
import {min, max} from "date-fns";

type PriceFilterProps = {
  min: number;
  max: number;
  step?: number;
  onChange?: (from: number, to: number) => void;
};

export const PriceFilter: FC<PriceFilterProps> = ({
  min = 0,
  max = 100000000,
  step = 1,
  onChange,
}) => {
  const [fromPrice, setFromPrice] = useState(min);
  const [toPrice, setToPrice] = useState(max);
  const [fromPriceFocused, setFromPriceFocused] = useState(false);
  const [toPriceFocused, setToPriceFocused] = useState(false);

  const {filters} = useSelector((state: RootState) => state.builder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setFilterBuilder({
        ...filters,
        materials: filters?.materials || [],
        weights: filters?.weights || [],
        brands: filters?.brands || [],
        colors: filters?.colors || [],
        prices: {from: fromPrice, to: toPrice},
      })
    );
  }, [fromPrice, toPrice]);

  const handleSliderChange = ([from, to]: [number, number]) => {
    setFromPrice(from);
    setToPrice(to);
    if (onChange) onChange(from, to);
  };

  const handleFromPriceChange = (value: number) => {
    if (value >= min && value <= toPrice) {
      setFromPrice(value);
      if (onChange) onChange(value, toPrice);
    }
  };

  const handleToPriceChange = (value: number) => {
    if (value <= max && value >= fromPrice) {
      setToPrice(value);
      if (onChange) onChange(fromPrice, value);
    }
  };
  return (
    <FilterDropDown
      onReset={() => handleSliderChange([min, max])}
      trigger={
        <div className="flex items-center justify-between select-none cursor-pointer px-2.5 h-10 rounded-full border border-gray-border">
          <span className="font-medium text-sm text-nowrap">
            {translate("prices")}
          </span>
          <ChevronDown size={20} />
        </div>
      }
      title={translate("prices")}
    >
      <div className="flex items-center gap-2">
        <Input
          type="text"
          id="fromPrice"
          value={
            fromPriceFocused
              ? fromPrice
              : formatNumber(fromPrice, {
                  mode: "currency",
                  currency: "VND",
                  locale: "vi-VN",
                  delimiter: ".",
                  precision: 0,
                })
          }
          onChange={(e) => handleFromPriceChange(Number(e.target.value))}
          onFocus={() => setFromPriceFocused(true)}
          onBlur={() => setFromPriceFocused(false)}
          min={min}
          max={toPrice}
          className={cn(
            "w-full text-xs font-medium  px-1.5 border-none bg-gray-primary",
            STYLES.disableFocusVisible
          )}
        />
        <Input
          type="text"
          id="toPrice"
          value={
            toPriceFocused
              ? toPrice
              : formatNumber(toPrice, {
                  mode: "currency",
                  currency: "VND",
                  locale: "vi-VN",
                  delimiter: ".",
                  precision: 0,
                })
          }
          onChange={(e) => handleToPriceChange(Number(e.target.value))}
          onFocus={() => setToPriceFocused(true)}
          onBlur={() => setToPriceFocused(false)}
          min={fromPrice}
          max={max}
          className={cn(
            "w-full text-xs font-medium px-1.5 border-none bg-gray-primary",
            STYLES.disableFocusVisible
          )}
        />
      </div>
      <SlideRange
        min={min}
        max={max}
        step={step}
        fromPrice={fromPrice}
        toPrice={toPrice}
        handleSliderChange={handleSliderChange}
      />
    </FilterDropDown>
  );
};
