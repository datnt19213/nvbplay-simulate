import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Shirt } from "lucide-react";
import React, { useState } from "react";

const ChooseProduct = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="size-5">
          <Shirt className="size-4 text-neutral-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Choose product</p>
      </PopoverContent>
    </Popover>
  );
};

export default ChooseProduct;
