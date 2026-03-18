import { AmountAction } from "@/components/base-components/counter/amount-action";
import Image from "@/components/base-components/images/image";
import { FormatCurrency } from "@/utilities/text";
import React from "react";

const ProductItem = ({ item }: { item: any }) => {
  return (
    <>
      <div className="hidden desktop:flex">
        <div className="grid grid-cols-12 w-full  items-center">
          <div
            className="col-span-5 flex items-center gap-3 w-full"
            title={item.product_title}
          >
            <div className="!size-20 aspect-square">
              <Image
                src={item?.thumbnail ? item.thumbnail : undefined}
                alt="product_image"
                className="rounded-lg aspect-square border border-gray-200 flex items-center justify-center"
              />
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <p className="text-sm  font-medium leading-5 w-full line-clamp-1">
                {item.product_title}
              </p>
              <div className="flex items-center gap-1 w-full justify-between">
                <span className="text-sm font-medium text-txtsecondary line-clamp-1">
                  {item.title}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-center">
            <span className="w-full text-sm font-medium text-txtsecondary">
              {FormatCurrency(item.unit_price)}
            </span>
          </div>
          <div className="col-span-2 text-center">
            <span className="w-full text-sm font-medium text-txtsecondary">
              x{item.quantity}
            </span>
          </div>
          <div className="col-span-3 text-right">
            <span className="w-full text-sm  font-semibold text-txtsecondary">
              {FormatCurrency(item.quantity * item.unit_price)}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex desktop:hidden flex-1 items-center">
        <div className="flex flex-1 items-start gap-3">
          <Image
            src={item?.thumbnail ? item.thumbnail : undefined}
            alt="product_image"
            className="rounded-lg border border-gray-200 size-20 flex items-center justify-center"
            classNameImage="size-[68px]"
          />
          <div className="flex flex-col items-start gap-2 flex-1">
            <p className="text-sm font-medium leading-5">
              {item.product_title}
            </p>
            <div className="flex items-center gap-1">
              <span>{item.title}</span>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <p className="line-clamp-1 text-gray-800 font-semibold">
                  {FormatCurrency(item.unit_price)}
                </p>
                <div className="border-r border-gray-200 h-4"></div>
                <span>x{item.quantity}</span>
              </div>
              <p className="col-span-3 w-full text-base text-right font-semibold items-end leading-6">
                {FormatCurrency(item.original_total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
