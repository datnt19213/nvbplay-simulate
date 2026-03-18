"use client";

import { useCallback, useEffect, useState } from "react";

interface CountdownOptions {
  seconds: number; // Total seconds to countdown
  onEnd?: () => void; // Callback when countdown finishes
}

interface CountdownReturn {
  hours: string; // Formatted hours (2 digits)
  minutes: string; // Formatted minutes (2 digits)
  seconds: string; // Formatted seconds (2 digits)
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const useCountdown = ({
  seconds,
  onEnd,
}: CountdownOptions): CountdownReturn => {
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isActive && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      if (onEnd) onEnd();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, secondsLeft, onEnd]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback(() => {
    setSecondsLeft(seconds);
    setIsActive(false);
  }, [seconds]);

  // Helper function to format numbers as 2-digit
  const formatTime = (time: number): string => String(time).padStart(2, "0");

  // Calculate hours, minutes, and seconds
  const hours = formatTime(Math.floor(secondsLeft / 3600));
  const minutes = formatTime(Math.floor((secondsLeft % 3600) / 60));
  const secs = formatTime(secondsLeft % 60);

  return { hours, minutes, seconds: secs, start, pause, reset };
};

export default useCountdown;
