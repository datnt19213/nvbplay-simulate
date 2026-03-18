"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { motion } from "framer-motion";

import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type AccordionType = "single" | "multiple";

const AccordionContext = createContext<{
  type?: AccordionType;
  openIndexes: Set<number>;
  toggleIndex: (index: number) => void;
} | null>(null);

export const Accordion: React.FC<{
  children: React.ReactNode;
  className?: string;
  type?: AccordionType;
  defaultValue?: number | number[]; // Added defaultValue prop
}> = ({ children, className, type = "single", defaultValue }) => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => {
    if (type === "single" && typeof defaultValue === "number") {
      return new Set([defaultValue]);
    } else if (type === "multiple" && Array.isArray(defaultValue)) {
      return new Set(defaultValue);
    }
    return new Set();
  });

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) => {
      const newSet = new Set(prev);
      if (type === "single") {
        newSet.clear();
        if (!prev.has(index)) newSet.add(index);
      } else {
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
      }
      return newSet;
    });
  };

  return (
    <AccordionContext.Provider value={{ type, openIndexes, toggleIndex }}>
      <dl className={cn("flex flex-col items-start justify-start", className)}>
        {children}
      </dl>
    </AccordionContext.Provider>
  );
};

export const Tab: React.FC<{
  children: React.ReactNode;
  className?: string;
  index: number;
}> = ({ children, className, index }) => {
  const { openIndexes, toggleIndex } = useContext(AccordionContext)!;

  const isOpen = openIndexes.has(index);

  return (
    <div className={cn("bg-bg w-full p-6", className)}>
      <TabContext.Provider
        value={{ isOpen, toggleIndex: () => toggleIndex(index) }}
      >
        {children}
      </TabContext.Provider>
    </div>
  );
};

const TabContext = createContext<{
  isOpen: boolean;
  toggleIndex: () => void;
} | null>(null);

export const Trigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { isOpen, toggleIndex } = useContext(TabContext)!;

  return (
    <dt>
      <button
        aria-expanded={isOpen}
        onClick={toggleIndex}
        className={cn(
          "flex w-full items-center justify-between gap-2 text-start text-xl font-normal",
          className
        )}
      >
        <span>{children}</span>
        <ChevronDown
          size={"20"}
          className={twMerge(
            isOpen ? "rotate-180" : "rotate-0",
            "min-w-[20px] transition-all duration-300 text-muted-foreground"
          )}
        />
      </button>
    </dt>
  );
};

export const Content: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { isOpen } = useContext(TabContext)!;

  return (
    <motion.dd
      layout
      aria-hidden={!isOpen}
      className={cn("overflow-hidden", className)}
      initial={{ height: 0, pointerEvents: "none" }}
      animate={
        isOpen
          ? { height: "fit-content", pointerEvents: "auto", marginTop: "1rem" }
          : { height: 0, pointerEvents: "none" }
      }
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.dd>
  );
};
