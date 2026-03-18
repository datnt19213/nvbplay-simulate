"use client";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormatCurrency } from "@/utilities/text";
import { useState } from "react";
import ColorPalette from "../color";
import Image from "../images/image";
import { Rating } from "../rating/rating";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  amount: number;
  sale?: {
    discount: number;
    end_date: string;
  };
  isFavourable?: boolean;
  colors: {
    id: number;
    color: string[];
  }[];
  withBoder?: boolean;
  withButton?: boolean;
  disabled?: boolean;
  className?: string;
}
const ProductCard = ({
  amount,
  id,
  image,
  name,
  price,
  isFavourable,
  sale,
  colors,
  withBoder,
  withButton = false,
  disabled = false,
  className,
}: Product) => {
  const [activeColor, setActiveColor] = useState("1");
  return (
    <div
      className={cn(
        "flex flex-col items-center bg-white rounded-lg border border-neutral-100 ",
        className,
        {
          border: withBoder,
        }
      )}
    >
      <div className="relative">
        <Image src={image} className="aspect-square rounded-lg " />
        <div className="absolute top-0 inset-x-0 flex pt-3 px-4 items-center justify-between">
          <div className="w-[49px] h-[22px] bg-[#FFE880] p-0.5 rounded flex gap-0 items-center">
            <img
              src="/icons/flash.svg"
              className="size-[22px] -ml-2.5" 
              loading="lazy"
              alt=""
            />
            <span className="text-sm -ml-2 font-medium text-[#E36301]">
              -31%
            </span>
          </div>
          {/* <Button
            variant="ghost"
            className="size-[30px] p-0.5 rounded-full text-primary bg-[#F5F5FA]"
          >
            <IconCustom icon="tabler:heart" className="size-5 mt-0.5" />
          </Button> */}
        </div>
      </div>
      <div className="p-4 w-full flex flex-col justify-between items-start gap-3">
        <div className="flex items-center gap-1.5">
          {colors.map((color, index) => (
            <ColorPalette
              key={index}
              colors={color.color}
              active={activeColor === color.id.toString()}
              onClick={() => setActiveColor(color.id.toString())}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1.5">
            <h5 className="text-xs text-[#27272A] font-medium desktop:text-sm hover:text-primary cursor-pointer line-clamp-2">
              {name}
            </h5>
            <div className="flex items-center gap-2">
              <Rating size={15} rating={4} className="" disabled />
              <p className="desktop:inline-block hidden text-xs text-[#515158] font-medium">
                12 đánh giá
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base text-primary font-semibold">
              {FormatCurrency(price)}
            </p>
            <p className="text-xs text-[#515158] font-medium line-through">
              {FormatCurrency(1900000)}
            </p>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-xs text-[#515158] font-medium">Đã bán 256</p>
            <p className="flex items-end gap-1 text-xs text-[#079449]">
              <IconCustom
                icon="tabler:building-store"
                className="size-4 hidden md:block"
              />
              <span>Kho: 192</span>
            </p>
          </div>
          {withButton && (
            <Button
              disabled={disabled}
              className="w-full rounded-lg disabled:bg-gray-200 disabled:text-gray-800 disabled:opacity-80"
            >
              Thêm vào giỏ
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
