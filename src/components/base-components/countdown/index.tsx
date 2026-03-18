// Countdown.tsx
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores";
import {decrement, reset, setTime, start, stop} from "@/stores/count-down";

interface CountdownProps {
  initialTime: number;
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({initialTime, onComplete}) => {
  const dispatch = useDispatch();
  const timeLeft = useSelector((state: RootState) => state.countdown.timeLeft);
  const isRunning = useSelector(
    (state: RootState) => state.countdown.isRunning
  );

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      dispatch(stop());
      if (onComplete) {
        onComplete();
      }
    }
  }, [timeLeft, isRunning, dispatch, onComplete]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch(decrement());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning, timeLeft, dispatch]);

  // useEffect(() => {
  //   if (!isRunning) {
  //     dispatch(setTime(initialTime));
  //     dispatch(start());
  //   }
  // }, [initialTime, dispatch, isRunning]);

  return <>{timeLeft}</>;
};

export default Countdown;
