"use client";
import {cn} from "@/lib/utils";
import {Minus, Plus} from "lucide-react";
import React, {useState, useEffect, useRef, HTMLAttributes} from "react";

interface CountingProps {
  initialValue?: number;
  min?: number;
  max?: number;
  durations?: number;
  steps?: number;
  activeHolding?: boolean;
  activeIncrement?: boolean;
  activeDecrement?: boolean;
  onIncrement?: (value?: number, changeStatus?: "active" | "freeze") => void;
  onDecrement?: (value?: number, changeStatus?: "active" | "freeze") => void;
  onValueChange?: (
    value: number,
    changeStatus?: "inc" | "dec" | "freeze"
  ) => void;
  inputClass?: HTMLAttributes<HTMLInputElement>["className"];
  decreaseClass?: HTMLAttributes<HTMLButtonElement>["className"];
  increaseClass?: HTMLAttributes<HTMLButtonElement>["className"];
  containerClass?: HTMLAttributes<HTMLDivElement>["className"];
  inputProps?: HTMLAttributes<HTMLInputElement>;
  decreaseProps?: HTMLAttributes<HTMLButtonElement>;
  increaseProps?: HTMLAttributes<HTMLButtonElement>;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export const Counting: React.FC<CountingProps> = ({
  initialValue = 0,
  min = 0,
  max = 100,
  durations = 100,
  steps = 1,
  activeHolding = true,
  activeIncrement = true,
  activeDecrement = true,
  onIncrement,
  onDecrement,
  onValueChange,
  inputClass,
  decreaseClass,
  increaseClass,
  containerClass,
  inputProps,
  decreaseProps,
  increaseProps,
  containerProps,
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const isHolding = useRef<boolean>(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const holdStarted = useRef<boolean>(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleIncrement = () => {
    if (value < max) {
      setValue(value + steps);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      setValue(value - steps);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      const numericValue = parseInt(inputValue, 10);
      if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
        numericValue > value && onIncrement?.(numericValue, "active");
        numericValue < value && onDecrement?.(numericValue, "active");
        numericValue > value && onValueChange?.(numericValue, "inc");
        numericValue < value && onValueChange?.(numericValue, "dec");
        setValue(numericValue);
      } else if (inputValue === "") {
        onDecrement?.(0);
        setValue(0);
      }
    }
  };

  const startContinuousIncrement = async () => {
    if (!isHolding.current) {
      isHolding.current = true;
      holdStarted.current = true;
      while (value < max && isHolding.current) {
        if (!holdStarted.current) break;
        activeIncrement && onIncrement?.(value + steps, "active");
        setValue((prev) => (prev + steps > max ? max : prev + steps));
        await sleep(durations);
      }
    }
  };

  const startContinuousDecrement = async () => {
    if (!isHolding.current) {
      isHolding.current = true;
      holdStarted.current = true;
      while (value > min && isHolding.current) {
        if (!holdStarted.current) break;
        activeDecrement && onDecrement?.(value - steps, "active");
        setValue((prev) => (prev - steps < min ? min : prev - steps));
        await sleep(durations);
      }
    }
  };

  const stopContinuousChange = () => {
    isHolding.current = false;
    holdStarted.current = false;
    holdTimeout.current && clearTimeout(holdTimeout.current);
    onIncrement && onIncrement(value, "freeze");
    onDecrement && onDecrement(value, "freeze");
  };

  const handleMouseDown = (type: "inc" | "dec") => {
    if (!activeHolding) return;

    holdTimeout.current = setTimeout(() => {
      holdStarted.current = true;
      type === "inc" ? startContinuousIncrement() : startContinuousDecrement();
    }, 2000); // Chỉ bắt đầu nếu giữ hơn 2 giây
  };

  const handleMouseUp = (type: "inc" | "dec") => {
    if (!holdStarted.current) {
      type === "inc" ? handleIncrement() : handleDecrement();
    }
    stopContinuousChange();
  };

  const blurValueChange = () => {
    onValueChange && onValueChange(value, "freeze");
  };

  return (
    <div
      {...containerProps}
      className={cn(
        "flex items-center border border-[#DDDDE3] h-7 rounded-[4px] overflow-hidden",
        containerClass
      )}
    >
      <button
        onMouseDown={() => handleMouseDown("dec")}
        onMouseUp={() => handleMouseUp("dec")}
        onMouseLeave={() => stopContinuousChange()}
        className={cn(
          "h-full bg-white w-7 flex items-center justify-center",
          decreaseClass
        )}
        disabled={value <= min}
        {...decreaseProps}
      >
        <Minus size={20} />
      </button>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={blurValueChange}
        className={cn(
          "w-10 h-full text-center bg-white text-sm font-medium focus:outline-none border-l border-r border-[#DDDDE3]",
          inputClass
        )}
        {...inputProps}
      />
      <button
        onMouseDown={() => handleMouseDown("inc")}
        onMouseUp={() => handleMouseUp("inc")}
        onMouseLeave={() => stopContinuousChange()}
        className={cn(
          "h-full bg-white w-7 flex items-center justify-center",
          increaseClass
        )}
        disabled={value >= max}
        {...increaseProps}
      >
        <Plus size={20} />
      </button>
    </div>
  );
};
