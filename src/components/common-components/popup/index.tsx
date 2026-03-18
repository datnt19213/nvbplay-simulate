import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getGlobalObject } from "@/services/globals";
import { parseDateWithOrdinal } from "@/utilities/date";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { isAfter, isBefore } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

const PopupFirstRender = () => {
  const [open, setOpen] = useState(false);
  const [popupShow, setPopupShow] = useSessionStorage("hasPopupShow", false);

  const popup = getGlobalObject("popup.popup");

  const data = useMemo(() => {
    return {
      title: popup?.["title"].value,
      thumbnail: popup?.["image"].value[0],
      from: popup?.["start-date"].value,
      to: popup?.["end-date"].value,
      link: popup?.["link"].value,
    };
  }, [popup]);

  useEffect(() => {
    if (data.from && data.to) {
      const fromDate = parseDateWithOrdinal(data.from);
      const toDate = parseDateWithOrdinal(data.to);
      const now = new Date();
      if (fromDate && toDate) {
        if (isAfter(now, fromDate) && isBefore(now, toDate)) {
          if (!popupShow) {
            setOpen(true);
            setPopupShow(true);
          }
        }
      }
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    // setPopupShow(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        withCloseButton={false}
        className="max-w-[800px] w-full h-[300px] md:h-[600px] flex flex-col items-start p-5 bg-transparent md:p-0 border-none rounded overflow-hidden"
      >
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full size-5"
            onClick={handleClose}
          >
            <X className="size-4" />
          </Button>
        </div>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>{data.title}</DialogTitle>
            <DialogDescription>{data.title}</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <Link
          href={data.link}
          onClick={handleClose}
          className="relative w-full h-full"
          title={data.title}
        >
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover"
          />
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default PopupFirstRender;
