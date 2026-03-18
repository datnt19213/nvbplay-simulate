"use client";
import React, {FC, ReactNode} from "react";
import {AnimatePresence, motion, Variants} from "framer-motion";

type FadeMotionLayoutProps = {
  children: ReactNode;
  action: boolean;
  className?: string;
  onClick?: () => void;
};

export const FadeMotionLayout: FC<FadeMotionLayoutProps> = ({
  children,
  action,
  className,
  onClick,
}) => {
  return (
    <AnimatePresence>
      {action && (
        <motion.div
          onClick={() => onClick && onClick()}
          className={className}
          initial={{opacity: 0}}
          animate={action ? {opacity: 1} : {opacity: 0}}
          exit={{opacity: 0}}
          transition={{type: "spring", stiffness: 300, damping: 30}}
          style={{pointerEvents: action ? "auto" : "none"}}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
