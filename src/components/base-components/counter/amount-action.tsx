"use client";

import NumberFlow from "@number-flow/react";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
type Props = {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  inputClassName?: string;
  wrapperClassName?: string;
  decrClassName?: string;
  incrClassName?: string;
  disabled?: boolean;
};

export function AmountAction({
  value = 0,
  min = -Infinity,
  max = Infinity,
  onChange,
  inputClassName,
  wrapperClassName,
  decrClassName,
  incrClassName,
  disabled,
}: Props) {
  const defaultValue = React.useRef(value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [animated, setAnimated] = React.useState(true);
  // Hide the caret during transitions so you can't see it shifting around:
  const [showCaret, setShowCaret] = React.useState(true);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: element,
  }) => {
    setAnimated(false);
    if (element.value === "") {
      onChange?.(defaultValue.current);
      return;
    }
    const number_ = Number.parseInt(element.value);
    if (
      // @ts-ignore
      isNaN(number_)(min != undefined && number_ < min)(
        max != undefined && number_ > max
      )
    ) {
      // Revert input's value:
      element.value = String(value);
    } else {
      // Manually update value in case they e.g. start with a "0" or end with a "."
      // which won't trigger a DOM update (because the number is the same):
      element.value = String(number_);
      onChange?.(number_);
    }
  };

  const handlePointerDown =
    (diff: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
      setAnimated(true);
      if (event.pointerType === "mouse") {
        event?.preventDefault();
        inputRef.current?.focus();
      }
      const newValue = Math.min(Math.max(value + diff, min), max);
      onChange?.(newValue);
    };

  return (
    <div
      className={cn(
        "group mx-auto flex w-fit items-center rounded-md border py-0 text-sm font-semibold",
        wrapperClassName
      )}
    >
      <Button
        size={"icon"}
        variant={"ghost"}
        aria-hidden
        tabIndex={-1}
        className={cn("size-[28px] border-none border-r", decrClassName)}
        disabled={disabled || min != undefined && value <= min}
        onPointerDown={handlePointerDown(-1)}
      >
        <Minus className="size-5" absoluteStrokeWidth strokeWidth={2} />
      </Button>
      <div className="relative w-[40px] h-[28px] px-2 grid items-center justify-items-center text-center border-x [grid-template-areas:'overlap'] *:[grid-area:overlap]">
        <input
          ref={inputRef}
          className={cn(
            showCaret ? "caret-primary" : "caret-transparent",
            "spin-hide pointer-events-none w-[1.5em] !appearance-none bg-transparent text-center font-[inherit] opacity-0"
          )}
          style={{
            fontKerning: "none",
            userSelect: "none",
            margin: 0,
            MozAppearance: "textfield",
          }}
          type="number"
          min={min}
          step={1}
          readOnly
          autoComplete="off"
          inputMode="numeric"
          max={max}
          value={value}
          onInput={handleInput}
        />

        <NumberFlow
          value={value}
          format={{ useGrouping: false }}
          aria-hidden
          animated={animated}
          onAnimationsStart={() => setShowCaret(false)}
          onAnimationsFinish={() => setShowCaret(true)}
          className={cn("pointer-events-none appearance-none", inputClassName)}
          willChange
        />
      </div>
      <Button
        size={"icon"}
        variant={"ghost"}
        aria-hidden
        tabIndex={-1}
        className={cn("size-[28px] border-none border-l", incrClassName)}
        disabled={disabled || max != undefined && value >= max}
        onPointerDown={handlePointerDown(1)}
      >
        <Plus className="size-5" absoluteStrokeWidth strokeWidth={2} />
      </Button>
    </div>
  );
}
