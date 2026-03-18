import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";
import {Label} from "@radix-ui/react-label";
import {Copy, XIcon} from "lucide-react";
import React, {FC, ReactNode, useEffect} from "react";
import {DialogHeader, DialogFooter} from "../dialog/nested-dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {useWindowSize} from "@/hooks";
import {FadeMotionLayout} from "@/layouts/component-layouts/fade-motion-layout";
type ModalProps = {
  open: boolean;
  title?: ReactNode;
  description?: string;
  children?: ReactNode;
  size?: "fit" | "full" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string;
  submitButton?: ReactNode;
  cancelButton?: ReactNode;
  headerModalClass?: string;
  footerModalClass?: string;
  titleClass?: string;
  wrapperClass?: string;
  bodyClass?: string;
  descriptionClass?: string;
  verticalPos?: "top" | "bottom" | "center";
  onClose?: (e?: React.MouseEvent<any>) => void;
  xIcon?: boolean;
};

const Modal: FC<ModalProps> = ({
  cancelButton,
  submitButton,
  open = false,
  children,
  description,
  size = "sm",
  title,
  headerModalClass,
  footerModalClass,
  bodyClass,
  descriptionClass,
  titleClass,
  wrapperClass,
  verticalPos = "center",
  onClose,
  xIcon = true,
}) => {
  // const isSize =
  //   size === "xs"
  //     ? "max-w-[350px]"
  //     : size === "sm"
  //       ? "max-w-screen-sm"
  //       : size === "md"
  //         ? "max-w-screen-md"
  //         : size === "lg"
  //           ? "max-w-screen-lg"
  //           : size === "xl"
  //             ? "max-w-screen-xl"
  //             : size === "2xl"
  //               ? "max-w-screen-2xl"
  //               : size === "full"
  //                 ? "max-w-full"
  //                 : size === "fit"
  //                   ? "max-w-min"
  //                   : size || "";
  // const vertPos =
  //   verticalPos === "center"
  //     ? "items-center"
  //     : verticalPos === "bottom"
  //       ? "items-end"
  //       : verticalPos === "top" && "items-start";
  const isSize =
    {
      xs: "max-w-[350px]",
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
      fit: "max-w-min",
    }[size] || size;

  const vertPos = {
    center: "items-center",
    bottom: "items-end",
    top: "items-start",
  }[verticalPos];

  useEffect(() => {
    if (typeof window !== "undefined" && open) {
      document.body.style.overflow = open ? "hidden" : "auto";
    }
  }, [open]);
  const [width, height] = useWindowSize();
  return (
    <FadeMotionLayout
      className={cn(
        "bg-black/30 z-[999] fixed w-full h-screen desktop:h-[calc(100%-140px)] flex items-center justify-center top-0 desktop:top-[140px] left-0",
        vertPos,
        open ? "flex pointer-events-auto" : "hidden pointer-events-none",
        wrapperClass
      )}
      action={open}
    >
      <Dialog open={open}>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className={cn(
            " w-full relative bg-white rounded-xl animate-duration-500 outline-none shadow-[0px_7px_30px_2px_#53535322]",
            open && "animate-fade-up",
            isSize
          )}
        >
          <DialogHeader className={cn("px-3 py-4", headerModalClass)}>
            <DialogTitle className={cn("w-full justify-between", titleClass)}>
              {title}
              {xIcon && (
                <DialogClose asChild onClick={() => onClose && onClose()}>
                  <XIcon
                    size={20}
                    className="absolute cursor-pointer top-2 right-2 text-txtprimary"
                  />
                </DialogClose>
              )}
            </DialogTitle>
            {description && (
              <DialogDescription className={cn("px-3", descriptionClass)}>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          <div
            style={{
              height: height < 700 ? `calc(${height}px - 430px)` : "auto",
            }}
            className={cn(
              "flex w-full px-3",
              height < 700
                ? "overflow-y-scroll scrollbar-none"
                : "overflow-y-hidden",
              bodyClass
            )}
          >
            {children}
          </div>
          <DialogFooter
            className={cn("w-full flex gap-3 py-4 px-3", footerModalClass)}
          >
            {cancelButton && (
              <DialogClose asChild onClick={() => onClose && onClose()}>
                {cancelButton}
              </DialogClose>
            )}
            {submitButton && submitButton}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FadeMotionLayout>
  );
};

export default Modal;
