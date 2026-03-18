import storeIcon from "@/assets/icons/building-store-green.svg";
import thunderIcon from "@/assets/icons/thunder-icon.svg";
import logo from "@/assets/images/logo.svg";
import RatingStar from "@/components/ui/rating-star";
import { ProductType } from "@/types/products/product.type";
import { FormatCurrency } from "@/utilities/text";
import Link from "next/link";
import Image from "@/components/base-components/images/image";
import { useMemo } from "react";

interface IProps {
  data: ProductType;
}

const ProductItem: React.FC<IProps> = ({ data }) => {
  const variant = data?.variants[0];
  const linkDetailProduct = `/products/${data.handle}?variantId=${variant?.id}`;

  const colors = data.options
    ?.find((i) => i.title === `Màu sắc`)
    ?.values?.map((i) => i.value.split(" "));

  const isSale = useMemo(() => {
    return (
      variant?.calculated_price?.calculated_price?.price_list_type === "sale"
    );
  }, [variant]);

  //   Lấy giá sale
  const salePrice = useMemo(() => {
    return FormatCurrency(variant?.calculated_price?.calculated_amount);
  }, [variant]);
  //   Lấy giá gốc
  const originalPrice = useMemo(() => {
    return FormatCurrency(variant?.calculated_price?.original_amount);
  }, [variant]);

  //   Lấy phần trăm giảm giá
  const salePercentage = useMemo(() => {
    return variant?.calculated_price?.original_amount &&
      variant?.calculated_price?.calculated_amount
      ? Math.round(
          ((variant.calculated_price.original_amount -
            variant.calculated_price.calculated_amount) /
            variant.calculated_price.original_amount) *
            100
        )
      : null;
  }, [variant]);

  // console.log(data);
  // console.log(variant);
  // console.log(originalPrice);
  // console.log(salePrice);
  // console.log(discountedAmount);
  // console.log(salePercentage);
//   console.log(data.thumbnail);
  return (
    <Link
      href={linkDetailProduct}
      className="w-full text-txtprimary rounded-[8px] overflow-hidden border border-[#f5f5fa] bg-white group"
    >
      <div className="w-full aspect-square relative bg-white rounded-[8px] overflow-hidden">
        <div className="absolute top-0 w-full left-0 flex justify-between pt-3 px-4 z-10">
          {isSale ? (
            <div className="text-14-21-600 h-fit relative p-[2px] pl-[10px] text-[#e36301] bg-[#ffe880] rounded-[4px]">
              <img
                className="absolute top-0 left-0"
                alt="icon"
                width={10}
                height={19}
                src={thunderIcon.src}
              />
              -{salePercentage}%
            </div>
          ) : (
            <div />
          )}
          {/* <button className="size-[30px] flex justify-center items-center rounded-full bg-[#f5f5fa]">
        <Heart size={15} className="text-[#ff3f1a]" />
      </button> */}
        </div>
        <div className="w-full h-full">
          <Image
            src={data?.thumbnail ? data.thumbnail : logo}
            alt="thumbnail"
            // fill
            className="w-full h-full"
            classNameImage="object-cover"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        {/* <div className="flex gap-[2px] min-h-[25.5px]">
      {colors?.map((color, index) => (
        <ColorPalette
          key={index}
          colors={color.map((i) => convertColor(i.toLowerCase()))}
          active={index === 0}
        />
      ))}
    </div> */}
        {/* Fixed height container for product name */}
        <div className="h-[42px]">
          {/* Height for 2 lines of text */}
          <p className="text-14-21-500 line-clamp-2 group-hover:text-primary">
            {data.title}
          </p>
        </div>
        <div className="flex justify-start items-center gap-2">
          <RatingStar amount={4} total={5} />
          <span className="text-12-18-400 text-gray-icon text-nowrap text-xs hidden lg:block">
            12 đánh giá
          </span>
        </div>
        <div className="text-16-24-700 text-red-primary">
          {originalPrice && originalPrice !== "NaN ₫" ? (
            <> {isSale ? salePrice : originalPrice}</>
          ) : (
            "Giá đang cập nhật"
          )}
        </div>
        {isSale && (
          <div className="text-12-18-500 text-gray-icon line-through">
            {originalPrice}
          </div>
        )}
        <div className="flex justify-between items-center text-12-18-400">
          <span>Đã bán {variant?.reserved_quantity || 0}</span>
          <div className="flex items-center gap-2">
            <img
              src={storeIcon.src}
              alt="icon"
              className="hidden md:block"
              width={16}
              height={16}
            />
            <span className="text-[#079449]">
              Kho:{" "}
              {(variant?.stocked_quantity || 0) -
                (variant?.reserved_quantity || 0)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
