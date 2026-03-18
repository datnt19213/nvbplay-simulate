"use client";
import React, {FC, ReactNode, useEffect, useState} from "react";

type TimeoutActionProps = {
  tick?: number;
  loading: boolean;
  onEnd?: () => void;
  onTickComponent?: ReactNode;
  onEndComponent?: ReactNode;
};

const TimeoutAction: FC<TimeoutActionProps> = ({
  tick = 10000,
  onEnd,
  onEndComponent,
  onTickComponent,
  loading,
}) => {
  const [state, setState] = useState(loading);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (loading) {
      timeout = setTimeout(() => {
        if (onEnd) {
          onEnd();
        }
        setState(false);
      }, tick);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loading, onEnd, tick]);

  return (
    <>
      {state && onTickComponent}
      {!state && onEndComponent}
    </>
  );
};

export default TimeoutAction;
