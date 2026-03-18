"use client";

import React, { useEffect, useRef, useState } from "react";

interface DualRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  onChange?: (values: { min: number; max: number }) => void;
  className?: string;
}

const DualRangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  defaultMinValue = 0,
  defaultMaxValue = 100,
  className = "",
  onChange,
}: DualRangeSliderProps) => {
  const [minValue, setMinValue] = useState(defaultMinValue);
  const [maxValue, setMaxValue] = useState(defaultMaxValue);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  useEffect(() => {
    setMinValue(defaultMinValue);
  }, [defaultMinValue]);

  useEffect(() => {
    setMaxValue(defaultMaxValue);
  }, [defaultMaxValue]);

  const handleMove = (clientX: number, thumb: "min" | "max") => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const width = rect.width;
    const left = rect.left;

    let newPercentage = ((clientX - left) / width) * 100;
    newPercentage = Math.max(0, Math.min(100, newPercentage));

    const newValue =
      Math.round(((newPercentage / 100) * (max - min)) / step) * step + min;

    if (thumb === "min") {
      if (newValue <= maxValue) {
        setMinValue(newValue);
        onChange?.({ min: newValue, max: maxValue });
      }
    } else {
      if (newValue >= minValue) {
        setMaxValue(newValue);
        onChange?.({ min: minValue, max: newValue });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent, thumb: "min" | "max") => {
    e.stopPropagation();
    setIsDragging(thumb);
    handleMove(e.clientX, thumb);
  };

  const handleTouchStart = (e: React.TouchEvent, thumb: "min" | "max") => {
    e.stopPropagation();
    setIsDragging(thumb);
    handleMove(e.touches[0].clientX, thumb);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX, isDragging);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX, isDragging);
    };

    const handleEnd = () => {
      setIsDragging(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  return (
    <div className={`relative w-full h-10 px-3 ${className}`}>
      <div className="relative w-full h-full">
        <div
          ref={sliderRef}
          className="absolute top-1/2 left-0 w-full h-[4px] bg-gray-200 rounded-full transform -translate-y-1/2"
        >
          {/* Track fill */}
          <div
            className="absolute h-full bg-[#0d5bb5] rounded-full"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />

          {/* Min thumb */}
          <div
            className={`absolute size-[16px] bg-white border-[4px] border-[#0d5bb5] rounded-full shadow-md transform -translate-y-1/2 -translate-x-1/2 transition-shadow hover:shadow-lg cursor-pointer ${
              isDragging === "min" ? "shadow-lg scale-110 z-20" : "z-10"
            }`}
            style={{ left: `${minPercentage}%`, top: "50%" }}
            onMouseDown={(e) => handleMouseDown(e, "min")}
            onTouchStart={(e) => handleTouchStart(e, "min")}
          />

          {/* Max thumb */}
          <div
            className={`absolute  size-[16px] bg-white border-[4px] border-[#0d5bb5] rounded-full shadow-md transform -translate-y-1/2 -translate-x-1/2 transition-shadow hover:shadow-lg cursor-pointer ${
              isDragging === "max" ? "shadow-lg scale-110 z-20" : "z-10"
            }`}
            style={{ left: `${maxPercentage}%`, top: "50%" }}
            onMouseDown={(e) => handleMouseDown(e, "max")}
            onTouchStart={(e) => handleTouchStart(e, "max")}
          />
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;
