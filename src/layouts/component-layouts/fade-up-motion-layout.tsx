"use client";
import React, { FC, ReactNode } from "react";
import { motion, Variants } from "framer-motion";

type FadeUpMotionLayoutProps = {
  children: ReactNode;
};
const variants: Variants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      type: "keyframes",
      ease: "linear",
      duration: 0.3,
    },
  },
};
export const FadeUpMotionLayout: FC<FadeUpMotionLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      variants={variants}
      viewport={{ once: true, amount: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
