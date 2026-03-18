"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { PopoverContentProps } from "@radix-ui/react-popover";
import { SheetContentProps } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React from "react";

interface PopoverResponsiveProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  popoverClassname?: string;
  sheetClassname?: string;
  popoverProps?: PopoverContentProps;
  sheetProps?: SheetContentProps;
}

const PopoverResponsive = ({
  children,
  trigger,
  open,
  setOpen,
  popoverClassname,
  sheetClassname,
  popoverProps,
  sheetProps,
}: PopoverResponsiveProps) => {
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div>{trigger}</div>
        </PopoverTrigger>
        <PopoverContent
          {...popoverProps}
          className={cn(
            "w-[360px] h-[600px] max-h-screen flex flex-col justify-between !rounded-[1.25rem] p-0 overflow-hidden",
            popoverClassname
          )}
        >
          <div className="relative w-full h-full">{children}</div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        {...sheetProps}
        side="bottom"
        className={cn(
          "h-[90vh] flex flex-col justify-between rounded-t-lg w-full p-0 overflow-hidden",
          sheetClassname
        )}
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default PopoverResponsive;
