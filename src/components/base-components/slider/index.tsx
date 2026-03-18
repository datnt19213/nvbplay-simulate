import React, {FC, useState} from "react";
import Slider from "rc-slider";

interface SlideRangeProps {
  min: number;
  max: number;
  step: number;
  fromPrice: number;
  toPrice: number;
  handleSliderChange: (value: [number, number]) => void;
}

export const SlideRange: FC<SlideRangeProps> = ({
  min = 0,
  max = 100,
  step = 1,
  fromPrice,
  toPrice,
  handleSliderChange,
}) => {
  return (
    <Slider
      range
      min={min}
      max={max}
      step={step}
      value={[fromPrice, toPrice]}
      onChange={(value) => handleSliderChange(value as [number, number])}
      trackStyle={[{backgroundColor: "#0D5BB5"}]}
      handleStyle={[
        {backgroundColor: "#ffffff", borderColor: "#0D5BB5", opacity: 1},
        {backgroundColor: "#ffffff", borderColor: "#0D5BB5", opacity: 1},
      ]}
    />
  );
};
