"use client";
import {BuilderCart, BuilderCartFill} from "@/assets/icons";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setCurrentSelectEquipment} from "@/stores/builder-header-slice";
import {ChevronLeft} from "lucide-react";
import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";

type EquipmentButtonListProps = {
  className?: string;
};
export const EquipmentButtonList: FC<EquipmentButtonListProps> = ({
  className,
}) => {
  const {currentEquipment} = useSelector(
    (state: RootState) => state.builderHeader
  );
  const dispatch = useDispatch();
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={() => dispatch(setCurrentSelectEquipment("1"))}
        type="button"
        className={cn(
          "rounded-full h-10  min-w-[93px] px-4 flex items-center justify-center transition-all",
          currentEquipment === "1"
            ? "text-white bg-txtprimary hover:bg-txtprimary"
            : "bg-gray-primary hover:bg-gray-primary text-txtprimary"
        )}
      >
        Trang bi 1
      </Button>
      <Button
        onClick={() => dispatch(setCurrentSelectEquipment("2"))}
        type="button"
        className={cn(
          "rounded-full h-10  min-w-[93px] px-4 flex items-center justify-center transition-all",
          currentEquipment === "2"
            ? "text-white bg-txtprimary hover:bg-txtprimary"
            : "bg-gray-primary hover:bg-gray-primary text-txtprimary"
        )}
      >
        Trang bi 2
      </Button>
      <Button
        onClick={() => dispatch(setCurrentSelectEquipment("3"))}
        type="button"
        className={cn(
          "rounded-full h-10  min-w-[93px] px-4 flex items-center justify-center transition-all",
          currentEquipment === "3"
            ? "text-white bg-txtprimary hover:bg-txtprimary"
            : "bg-gray-primary hover:bg-gray-primary text-txtprimary"
        )}
      >
        Trang bi 3
      </Button>
    </div>
  );
};

type ToBackEquipmentProps = {
  nameOfEquipment: string;
  description: string;
};
export const ToBackEquipment: FC<ToBackEquipmentProps> = ({
  description,
  nameOfEquipment,
}) => {
  return (
    <div className="w-fit flex items-center gap-3">
      <ChevronLeft size={24} />
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-txtprimary">
          {nameOfEquipment || "Trang bị chưa đặt tên"}
        </span>
        <span className="text-txtsecondary text-sm font-medium">
          {description || "Xây dựng trang bị mới"}
        </span>
      </div>
    </div>
  );
};

export const CartBuilderHeader = () => {
  return (
    <>
      <div className="relative h-10 w-10 aspect-square rounded-full bg-gray-primary hidden desktop:flex items-center justify-center">
        <img
          src={BuilderCartFill.src}
          alt="img"
          className="relative aspect-square w-6 h-6 z-[1]"
        />
        <div className="absolute text-[10px] font-bold text-white -top-1 -right-1 h-[18px] w-[18px] bg-txtthird rounded-full z-[2] flex items-center justify-center">
          10
        </div>
      </div>
      <div className="relative h-10 w-10 aspect-square rounded-full bg-transparent desktop:hidden flex items-center justify-center">
        <img
          src={BuilderCart.src}
          alt="img"
          className="relative aspect-square w-6 h-6 z-[1]"
        />
        <div className="absolute text-[10px] font-bold text-white -top-1 -right-1 h-[18px] w-[18px] bg-txtthird rounded-full z-[2] flex items-center justify-center">
          10
        </div>
      </div>
    </>
  );
};
