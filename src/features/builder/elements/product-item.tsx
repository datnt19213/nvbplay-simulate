import {Batminton} from "@/assets/images";
import {STYLES} from "@/configs";
import {cn} from "@/lib/utils";
import {Trash2} from "lucide-react";
import React, {FC, useState} from "react";
import {Counting} from "../../../components/base-components/couting";
import Select from "@/components/base-components/select";

const ProductItem = () => {
  return <div>ProductItem</div>;
};

type ProductItemEquipedProps = {
  isSelected?: boolean;
  data: any;
  onSelected?: (data: any) => void;
  onDelete?: (data: any) => void;
};
export const ProductItemEquiped: FC<ProductItemEquipedProps> = ({
  isSelected = false,
  data,
  onSelected,
  onDelete,
}) => {
  function hanldeDeleteItem(data: any): void {
    onDelete && onDelete(data);
  }

  return (
    <div
      onClick={() => onSelected && onSelected(data)}
      className={cn(
        "flex flex-col cursor-pointer gap-3 h-[162px] transition-all duration-200 rounded-lg py-3 text-txtprimary",
        isSelected
          ? "bg-blue-third border border-blue-primary"
          : "bg-white border border-gray-border"
      )}
    >
      <div className="w-full flex items-center">
        <div className="flex items-center gap-2 px-3">
          <div className="min-w-14 h-14 overflow-hidden rounded-lg bg-white">
            <img
              src={Batminton.src}
              alt="img"
              className="h-full w-auto object-cover"
            />
          </div>
          <p className="line-clamp-2 text-sm font-medium">
            VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)
          </p>
          <div
            className="h-10 min-w-10 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2
              size={24}
              className="text-red-primary"
              onClick={() => hanldeDeleteItem(data)}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full px-3">
        <Select
          className={cn(
            "w-[52px] h-[30px] border border-[#DDDDE3] rounded-lg bg-white text-txtprimary px-2.5",
            STYLES.disableFocusVisible
          )}
          items={[
            {id: "1", value: "s", name: "S"},
            {id: "2", value: "m", name: "M"},
            {id: "3", value: "l", name: "L"},
            {id: "4", value: "4", name: "XL"},
          ]}
          actionButton={(value) => (
            <span className="text-xs font-medium text-txtprimary">
              {value && value.name}
            </span>
          )}
        />
        <Select
          actionButton={(value) => (
            <span className="text-xs font-medium text-txtprimary">
              {value && value.name}
            </span>
          )}
          className={cn(
            "w-[100px] h-[30px] border border-[#DDDDE3] rounded-lg bg-white text-txtprimary px-1.5",
            STYLES.disableFocusVisible
          )}
          items={[
            {id: "1", value: "Trắng đen", name: "Trắng đen"},
            {id: "2", value: "Vàng xanh", name: "Vàng xanh"},
            {id: "3", value: "Đỏ đen", name: "Đỏ đen"},
            {id: "4", value: "Tím trắng", name: "Tím trắng"},
          ]}
        />
      </div>
      <div className="flex justify-between items-center px-3">
        <Counting
          onDecrement={(value, changeStatus) =>
            console.log(value + "-" + changeStatus)
          }
          onIncrement={(value, changeStatus) =>
            console.log(value + "-" + changeStatus)
          }
          onValueChange={(value, changeStatus) =>
            console.log(value + "-" + changeStatus)
          }
        />
        <span className="font-bold text-txtthird text-right">1.350.000 ₫</span>
      </div>
    </div>
  );
};
