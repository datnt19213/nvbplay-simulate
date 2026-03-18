import Image from "@/components/base-components/images/image";
import {FormatCurrency} from "@/utilities/text";
import {redirect} from "next/navigation";
import React, {FC} from "react";

type ProductItemProps = {
  title?: string;
  size?: string;
  color?: string;
  salePrice?: string;
  regularPrice?: string;
  variant?: string;
  quantity?: string;
  handle_slug?: string;
  thumnail?: string;
  productId: any;
};
const ProductItem: FC<ProductItemProps> = ({
  color,
  regularPrice,
  salePrice,
  size,
  title,
  quantity,
  variant,
  handle_slug,
  thumnail,
  productId,
}) => {
  function handleNavigateDetailProduct(handle_slug: string | undefined): void {
    redirect(`/product/${productId}`);
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex items-center gap-3 w-full">
        <Image
          src={`${thumnail}`}
          alt="product_image"
          className="rounded-lg border border-gray-200 size-20 min-w-20  aspect-square flex items-center justify-center"
          classNameImage="size-[68px]"
        />
        <div className="flex flex-col gap-1 w-full">
          <p
            className="text-sm font-semibold leading-5 cursor-pointer hover:text-txtthird transition-all duration-300"
            onClick={() => handleNavigateDetailProduct(handle_slug)}
          >
            {title}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-txtsecondary text-sm font-medium text-nowrap">
                {size && color && (
                  <>
                    <p>{size}</p>,<p>{color}</p>
                  </>
                )}
                {variant && <p>{variant}</p>}
              </div>
              <span className="text-txtsecondary text-sm font-medium">
                x{quantity}
              </span>
            </div>
            <div className="flex flex-col items-end w-full">
              {salePrice && (
                <p className="text-xs line-through leading-[18px] text-muted-foreground">
                  {FormatCurrency(Number(salePrice || 0))}
                </p>
              )}
              <p className="text-sm font-bold">
                {regularPrice && FormatCurrency(Number(regularPrice || 0))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
