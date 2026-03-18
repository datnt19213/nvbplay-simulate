"use client";

import { RootState } from "@/stores";
import { FormatCurrency } from "@/utilities/text";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import PriceBox from "./atom/price-box";

export const ShowProductPrice = () => {
  const selectedVariant = useSelector(
    (state: RootState) => state.detail_product.variant
  );

  //   Kiểm tra sản phẩm có sale hay không
  const isSale = useMemo(() => {
    return (
      selectedVariant?.calculated_price?.calculated_price?.price_list_type ===
      "sale"
    );
  }, [selectedVariant]);

  //   Lấy giá sale
  const salePrice = useMemo(() => {
    return FormatCurrency(selectedVariant?.calculated_price?.calculated_amount);
  }, [selectedVariant]);
  //   Lấy giá gốc
  const originalPrice = useMemo(() => {
    return FormatCurrency(selectedVariant?.calculated_price?.original_amount);
  }, [selectedVariant]);
  //   Lấy số tiền được giảm
  const discountedAmount = useMemo(() => {
    return FormatCurrency(
      selectedVariant?.calculated_price?.original_amount -
        selectedVariant?.calculated_price?.calculated_amount
    );
  }, [selectedVariant]);

  //   Lấy phần trăm giảm giá
  const salePercentage = useMemo(() => {
    return selectedVariant?.calculated_price?.original_amount &&
      selectedVariant?.calculated_price?.calculated_amount
      ? Math.round(
          ((selectedVariant.calculated_price.original_amount -
            selectedVariant.calculated_price.calculated_amount) /
            selectedVariant.calculated_price.original_amount) *
            100
        )
      : null;
  }, [selectedVariant]);

  // console.log("ORIGINAL PRICE:", originalPrice);
  // console.log("ISNANA:", originalPrice == 'NaN ₫');

  return (
    <div className="flex justify-between items-center gap-2 flex-wrap">
      {originalPrice && originalPrice !== 'NaN ₫' ? (
        <PriceBox
          type="normal"
          originalPrice={isSale ? salePrice : originalPrice}
          discount={isSale ? originalPrice : ""}
          discountPercent={isSale ? `${salePercentage || 0}%` : ""}
        />
      ) : (
        <h2 className="text-txtthird text-xl font-semibold">
          Giá đang được cập nhật
        </h2>
      )}
      {/* <div className="flex items-center gap-1 bg-[#FFF5C7] px-0.5 rounded-full border border-[#FFE880]">
        <img src={coin.src} alt="" className="size-[20px]" />
        <span className="text-sm text-[#CC8100] font-semibold mr-1">
          +1.350 NVB Loyalty
        </span>
      </div> */}
    </div>
  );
};
