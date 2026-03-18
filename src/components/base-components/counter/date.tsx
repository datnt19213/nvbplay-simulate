"use client"; // Ensure this runs on the client side

import { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";

type CountdownProps = {
  targetDate: string; // The target date to countdown to
  withUnit?: boolean;
};

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  withUnit = false,
}) => {
  return (
    <div className="p-4">
      <div className="mx-auto flex gap-1 desktop:gap-2 w-full max-w-5xl items-center bg-white">
        <CountdownItem
          targetDate={targetDate}
          unit="Day"
          text="days"
          withUnit={withUnit}
        />
        <span>:</span>
        <CountdownItem
          targetDate={targetDate}
          unit="Hour"
          text="hours"
          withUnit={withUnit}
        />
        <span>:</span>
        <CountdownItem
          targetDate={targetDate}
          unit="Minute"
          text="minutes"
          withUnit={withUnit}
        />
        <span>:</span>
        <CountdownItem
          targetDate={targetDate}
          unit="Second"
          text="seconds"
          withUnit={withUnit}
        />
      </div>
    </div>
  );
};

type CountdownItemProps = {
  targetDate: string;
  unit: "Day" | "Hour" | "Minute" | "Second";
  withUnit?: boolean;
  text: string;
};

const CountdownItem: React.FC<CountdownItemProps> = ({
  targetDate,
  unit,
  text,
  withUnit = false,
}) => {
  const { ref, time } = useTimer(targetDate, unit);

  return (
    <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
      <div className="relative flex items-center justify-center size-8 rounded-lg overflow-hidden text-center bg-gradient-to-b from-[#FF3F1A] to-[#E98B2E]">
        <span ref={ref} className="block text-sm text-white font-medium">
          {time < 10 ? `0${time}` : time}
        </span>
      </div>
      {withUnit && (
        <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base">
          {text}
        </span>
      )}
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
          // Exit animation
          await animate(
            ref.current,
            { y: ["0%", "-50%"], opacity: [1, 0] },
            { duration: 0.35 }
          );
        }

        timeRef.current = newTime;
        setTime(newTime);

        if (ref.current) {
          // Enter animation
          await animate(
            ref.current,
            { y: ["50%", "0%"], opacity: [0, 1] },
            { duration: 0.35 }
          );
        }
      }
    };

    // Start the interval
    intervalRef.current = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately to initialize

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [targetDate, unit, animate, ref]);

  return { ref, time };
};

export default Countdown;
