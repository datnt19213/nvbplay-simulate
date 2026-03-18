"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import FilterTitle from "../atom/filter-title";
import FilterContainer from "../filter-side-bar/filter-container.";

interface IProps {
  className?: string;
}

const FilterSheet: React.FC<IProps> = ({ className }) => {
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };

  const open = () => {
    setShow(true);
  };

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <FilterTitle onClick={open} className="!px-0" title="Bộ lọc" />
      <SheetContent side={"bottom"} className="w-full p-0 rounded-t-[8px]">
        <SheetHeader className="py-[8px] ">
          <SheetTitle className="flex justify-center">
            <FilterTitle className="p-0" />
          </SheetTitle>
        </SheetHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          <FilterContainer close={close} showTitle={false} className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
