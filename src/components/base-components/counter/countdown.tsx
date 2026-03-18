"use client";

import {useEffect, useRef, useState} from "react";
import {useAnimate} from "framer-motion";
import {cn} from "@/lib/utils";

type CountdownBoxProps = {
  targetDate: string;
  withUnit?: boolean;
  containerClass?: string;
  itemClass?: string;
  numberClass?: string;
  unitClass?: string;
  separatorClass?: string;
  wrapperClass?: string;
};

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const CountdownBox: React.FC<CountdownBoxProps> = ({
  targetDate,
  withUnit = false,
  containerClass = "p-4",
  itemClass = "flex flex-col items-center justify-center gap-1 md:gap-2",
  numberClass = "relative flex items-center justify-center  rounded-lg overflow-hidden text-center bg-gradient-to-b from-[#FF3F1A] to-[#E98B2E]",
  unitClass = "text-xs font-light text-slate-500 md:text-sm lg:text-base",
  separatorClass = "mx-1",
  wrapperClass,
}) => {
  return (
    <div className={containerClass}>
      <div
        className={cn(
          "mx-auto flex gap-1 desktop:gap-2 w-full max-w-5xl items-center",
          wrapperClass
        )}
      >
        <CountdownBoxItem
          targetDate={targetDate}
          unit="Day"
          text="days"
          withUnit={withUnit}
          itemClass={itemClass}
          numberClass={numberClass}
          unitClass={unitClass}
        />
        <span className={separatorClass}>:</span>
        <CountdownBoxItem
          targetDate={targetDate}
          unit="Hour"
          text="hours"
          withUnit={withUnit}
          itemClass={itemClass}
          numberClass={numberClass}
          unitClass={unitClass}
        />
        <span className={separatorClass}>:</span>
        <CountdownBoxItem
          targetDate={targetDate}
          unit="Minute"
          text="minutes"
          withUnit={withUnit}
          itemClass={itemClass}
          numberClass={numberClass}
          unitClass={unitClass}
        />
        <span className={separatorClass}>:</span>
        <CountdownBoxItem
          targetDate={targetDate}
          unit="Second"
          text="seconds"
          withUnit={withUnit}
          itemClass={itemClass}
          numberClass={numberClass}
          unitClass={unitClass}
        />
      </div>
    </div>
  );
};

type CountdownBoxItemProps = {
  targetDate: string;
  unit: "Day" | "Hour" | "Minute" | "Second";
  withUnit?: boolean;
  text: string;
  itemClass: string;
  numberClass: string;
  unitClass: string;
};

const CountdownBoxItem: React.FC<CountdownBoxItemProps> = ({
  targetDate,
  unit,
  text,
  withUnit = false,
  itemClass,
  numberClass,
  unitClass,
}) => {
  const {ref, time} = useTimer(targetDate, unit);

  return (
    <div className={cn("flex items-center", itemClass)}>
      <div
        className={cn(
          "size-11 aspect-square text-lg font-bold rounded-[4px] bg-white overflow-hidden flex items-center justify-center",
          numberClass
        )}
      >
        <span ref={ref}>{time}</span>
      </div>
      {withUnit && <span className={unitClass}>{text}</span>}
    </div>
  );
};

const useTimer = (
  targetDate: string,
  unit: "Day" | "Hour" | "Minute" | "Second"
) => {
  const [ref, animate] = useAnimate();
  const [time, setTime] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const updateCountdown = async () => {
      const now = new Date();
      const end = new Date(targetDate);
      const distance = Math.max(0, end.getTime() - now.getTime());

      let newTime = 0;

      if (unit === "Day") {
        newTime = Math.floor(distance / DAY);
      } else if (unit === "Hour") {
        newTime = Math.floor((distance % DAY) / HOUR);
      } else if (unit === "Minute") {
        newTime = Math.floor((distance % HOUR) / MINUTE);
      } else if (unit === "Second") {
        newTime = Math.floor((distance % MINUTE) / SECOND);
      }

      if (newTime !== timeRef.current) {
        if (ref.current) {
          await animate(
            ref.current,
            {y: ["0%", "-50%"], opacity: [1, 0]},
            {duration: 0.35}
          );
        }

        timeRef.current = newTime;
        setTime(newTime);

        if (ref.current) {
          await animate(
            ref.current,
            {y: ["50%", "0%"], opacity: [0, 1]},
            {duration: 0.35}
          );
        }
      }
    };

    intervalRef.current = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [targetDate, unit, animate, ref]);

  return {ref, time};
};

export default CountdownBox;
