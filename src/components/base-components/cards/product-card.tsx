"use client";
import { FormatCurrency } from "@/utilities/text";
import { Button } from "@/components/ui/button";
import IconCustom from "@/components/common-components/icon-custom";
import { useState } from "react";
import { Rating } from "../rating/rating";
import { cn } from "@/lib/utils";
import { Product as ProductType } from "@/services/products/type";
import Link from "next/link";
import NextImage from "../images/next-image";
import HeartActionWishList from "./heart-action";

interface Product extends ProductType {
  withBoder?: boolean;
  withButton?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent, variantId: string) => void;
}
const ProductCard = ({
  id,
  images,
  withBoder,
  title,
  withButton = false,
  disabled = false,
  onClick,
  handle,
  variants,
  sales_channels,
}: Product) => {
  const [activeVariant, setactiveVariant] = useState(
    variants && variants.length > 0 ? variants[0] : null
  );

  const isSale =
    activeVariant?.calculated_price?.calculated_price?.price_list_type ===
    "sale";

  //   Lấy giá sale
  const salePrice = FormatCurrency(
    activeVariant?.calculated_price?.calculated_amount || 0
  );
  //   Lấy giá gốc
  const originalPrice = FormatCurrency(
    activeVariant?.calculated_price?.original_amount || 0
  );
  //   Lấy số tiền được giảm
  const discountedAmount = FormatCurrency(
    (activeVariant?.calculated_price?.original_amount || 0) -
      (activeVariant?.calculated_price?.calculated_amount || 0)
  );

  //   Lấy phần trăm giảm giá
  const salePercentage =
    activeVariant?.calculated_price?.original_amount &&
    activeVariant?.calculated_price?.calculated_amount
      ? Math.round(
          ((activeVariant.calculated_price.original_amount -
            activeVariant.calculated_price.calculated_amount) /
            activeVariant.calculated_price.original_amount) *
            100
        )
      : null;

  return (
    <div
      className={cn(
        "flex flex-col flex-1 w-full relative items-center group bg-white rounded-lg select-none",
        {
          border: withBoder,
        }
      )}
    >
      <div className="relative w-full">
        <div className="w-full aspect-square rounded-lg overflow-hidden">
          <Link
            href={`/products/${handle}?variantId=${activeVariant?.id}`}
            className="w-full h-full"
          >
            <NextImage url={images[0]?.url.toString()} />
          </Link>
        </div>
        <div className="absolute w-full top-0 inset-x-0 flex pt-3 px-4 items-center justify-between">
          {isSale ? (
            <div className="w-[49px] h-[22px] bg-[#FFE880] p-0.5 rounded flex gap-0 items-center cursor-pointer">
              <img
                src="/icons/flash.svg"
                className="size-[22px] -ml-2.5"
                loading="lazy"
                alt=""
              />
              <span className="text-sm -ml-2 font-medium text-[#E36301]">
                -{salePercentage}%
              </span>
            </div>
          ) : (
            <div />
          )}
          <HeartActionWishList id={activeVariant?.id || ""} />
        </div>
      </div>
      <Link
        href={`/products/${handle}?variantId=${activeVariant?.id}`}
        className="p-4 w-full h-full flex flex-col items-start justify-between gap-3"
      >
        <div className="flex flex-col justify-between w-full h-full gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1.5">
              <div>
                <h5 className="text-xs text-[#27272A] font-medium desktop:text-sm group-hover:text-primary transition-colors duration-300 cursor-pointer line-clamp-1">
                  {title}
                </h5>
              </div>
              <div className="flex items-center gap-2">
                <Rating size={15} rating={4} className="" disabled />
                <p className="desktop:inline-block hidden text-xs text-[#515158] font-medium">
                  12 đánh giá
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base text-primary font-bold">
                {isSale ? salePrice : originalPrice}
              </p>
              <p className="text-xs text-[#515158] font-medium line-through">
                {isSale ? originalPrice : ""}
              </p>
            </div>
          </div>
          {/* <div className="flex flex-1 gap-1 items-center text-sm">
            <div className="relative aspect-square">
              <MapPin className="size-4 text-muted-foreground" />
            </div>
            <span className="line-clamp-2 text-xs text-muted-foreground">
              {sales_channels && sales_channels[0]?.name}
            </span>
          </div> */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#515158] font-medium line-clamp-1">
              Đã bán {activeVariant?.reserved_quantity || 0}
            </p>
            {disabled ? (
              <p className="text-xs text-red-500">Hết hàng</p>
            ) : (
              <p className="flex items-end gap-1 text-xs text-[#079449]">
                <IconCustom icon="tabler:building-store" className="size-4" />
                <span>
                  Kho:{" "}
                  {(activeVariant &&
                    activeVariant?.stocked_quantity -
                      activeVariant?.reserved_quantity) ||
                    0}
                </span>
              </p>
            )}
          </div>
        </div>
        {withButton && (
          <Button
            onClick={(e) => onClick && onClick(e, activeVariant?.id || "")}
            //   disabled={disabled || !activeVariant?.inventory_quantity}
            className="w-full rounded-lg disabled:bg-gray-200 disabled:text-gray-800 disabled:opacity-80"
          >
            <IconCustom icon="tabler:shopping-cart" className="size-5" />
            <span>Thêm vào giỏ</span>
          </Button>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
