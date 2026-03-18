"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React from "react";

interface DialogResponsiveProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogClassname?: string;
  sheetClassname?: string;
}

const DialogResponsive = ({
  children,
  trigger,
  open,
  setOpen,
  dialogClassname,
  sheetClassname,
}: DialogResponsiveProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <div>{trigger}</div>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "w-[560px] h-[600px] max-h-screen flex flex-col justify-between !rounded-[1.25rem] p-0 overflow-hidden",
            dialogClassname
          )}
        >
          <div className="relative w-full h-full">
            <VisuallyHidden>
              <DialogHeader>
                <DialogTitle>Title</DialogTitle>
                <DialogDescription>Description</DialogDescription>
              </DialogHeader>
            </VisuallyHidden>
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <div>{trigger}</div>
      </SheetTrigger>
      <SheetContent
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

export default DialogResponsive;
