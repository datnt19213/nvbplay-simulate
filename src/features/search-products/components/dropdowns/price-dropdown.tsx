"use client";

import { Button } from "@/components/ui/button";
import DualRangeSlider from "@/components/ui/dual-range-slider";
import useMediaQueryScreen from "@/hooks/useMediaQueryScreen";
import { RootState } from "@/stores";
import { setSelectedPrice, setTriggerApply } from "@/stores/search-slice";
import { FormatCurrency } from "@/utilities/text";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseDropdown from "./base-dropdown";

interface IProps {
  title: string;
}

const MIN_VALUE = 100000; // Your minimum possible value
const MAX_VALUE = 100000000;
const PriceDropdown: React.FC<IProps> = ({ title }) => {
  const dispatch = useDispatch();
  const { isMobile } = useMediaQueryScreen();
  const { triggerApply, selectedPrice } = useSelector(
    (state: RootState) => state.search
  );

  const [min, setMin] = useState(MIN_VALUE);
  const [max, setMax] = useState(MAX_VALUE);

  useEffect(() => {
    if (triggerApply) {
      handleSet();
      dispatch(setTriggerApply(false));
    }
  }, [triggerApply]);

  useEffect(() => {
    setMin(selectedPrice?.min || MIN_VALUE);
    setMax(selectedPrice?.max || MAX_VALUE);
  }, [selectedPrice]);

  const onChange = (values: { min: number; max: number }) => {
    const range = MAX_VALUE - MIN_VALUE;
    const newMin = MIN_VALUE + (range * values.min) / 100;
    const newMax = MIN_VALUE + (range * values.max) / 100;
    setMin(Math.round(newMin));
    setMax(Math.round(newMax));
  };

  const handleSet = () => {
    dispatch(setSelectedPrice({ min, max }));
  };

  const handleReset = () => {
    setMin(MIN_VALUE);
    setMax(MAX_VALUE);
    if (!isMobile)
      dispatch(setSelectedPrice({ min: MIN_VALUE, max: MAX_VALUE }));
  };

  return (
    <BaseDropdown title={title}>
      <div className="space-y-[8px]">
        <div className="flex justify-between text-12-18-500">
          <span className="bg-[#f5f5fa] p-[8px] rounded-[4px]">
            {FormatCurrency(min)}
          </span>
          <span className="bg-[#f5f5fa] p-[8px] rounded-[4px]">
            {FormatCurrency(max)}
          </span>
        </div>
        <DualRangeSlider
          defaultMinValue={((min - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100}
          defaultMaxValue={((max - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100}
          onChange={onChange}
        />
        <div className="flex gap-[8px]">
          <Button
            onClick={handleReset}
            variant={"grayPrimary"}
            className="w-full"
          >
            Đặt lại
          </Button>
          <Button onClick={handleSet} className="w-full hidden md:block">
            Áp dụng
          </Button>
        </div>
      </div>
    </BaseDropdown>
  );
};

export default PriceDropdown;
