"use client";
import React, {CSSProperties, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {cn} from "@/lib/utils";

type CollapsibleProps = {
  children: React.ReactNode;
  actionButton?: React.ReactNode | any;
  actionButtonClass?: string;
  childrenClass?: string;
  className?: string;
  isDefault?: boolean;
  duration?: number;
  style?: CSSProperties;
};

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  actionButton,
  actionButtonClass,
  childrenClass,
  className,
  isDefault = true,
  duration = 0.5,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(isDefault);

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div style={style} className={cn("w-full", className)}>
      <div onClick={toggleCollapse} className={cn("w-full", actionButtonClass)}>
        {typeof actionButton === "function"
          ? actionButton({isOpen})
          : actionButton}
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{height: 0, opacity: 0}}
            animate={{height: "auto", opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{
              duration: duration,
              ease: [0.4, 0, 0.2, 1],
            }}
            className={cn("overflow-hidden w-full", childrenClass)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collapsible;
