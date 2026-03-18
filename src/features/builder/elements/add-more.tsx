"use client";
import Collapsible from "@/components/base-components/collapsible-animation";
import {cn} from "@/lib/utils";
import {ChevronDown, ChevronUp, Plus} from "lucide-react";
import React, {CSSProperties, FC, useState} from "react";
import {ProductItemEquiped} from "./product-item";

type AddMoreProps = {
  name: string;
  onClickToSelect?: () => void;
  onSelected?: (data?: any) => void;
  isSelected?: boolean;
  data: any;
  style?: CSSProperties;
};
const AddMore: FC<AddMoreProps> = ({
  name,
  data,
  isSelected,
  onClickToSelect,
  onSelected,
  style = {},
}) => {
  return (
    <Collapsible
      style={style}
      duration={0.2}
      className={
        "flex flex-col gap-3 p-4 border-b border-gray-border animate-fade-up relative z-[1]"
      }
      actionButton={({isOpen}: {isOpen: boolean}) => (
        <div className="flex justify-between items-center text-lg font-semibold cursor-pointer select-none text-txtprimary ">
          <span>{name}</span>
          <ChevronDown
            size={24}
            className={cn(
              "transition-all duration-200",
              isOpen ? "" : "rotate-180"
            )}
          />
        </div>
      )}
    >
      {!data && (
        <div
          className="flex items-center justify-center border border-dashed gap-2 border-gray-seventh rounded-lg h-[120px] select-none cursor-pointer"
          onClick={() => onClickToSelect && onClickToSelect()}
        >
          <div className="h-8 w-8 rounded-full bg-blue-third flex items-center justify-center">
            <Plus size={24} className="text-txtfourth" />
          </div>
          <span className="font-semibold text-txtfourth">Chọn trang bị</span>
        </div>
      )}
      {data && (
        <ProductItemEquiped
          isSelected={isSelected}
          {...data}
          onSelected={onSelected}
          onDelete={(data: any) => console.log(data)}
        />
      )}
    </Collapsible>
  );
};

export default AddMore;
