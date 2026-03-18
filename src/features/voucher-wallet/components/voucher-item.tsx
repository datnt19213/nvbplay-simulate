import tag from "@/assets/icons/voucher-quantity-tag.svg";
import Image from "next/image";
import React from "react";

export interface IVoucherItem {
  code: string;
  discount: string;
  minPurchase: number;
  category: string;
  expiryDate: string;
  multiplier: number;
}

const VoucherItem: React.FC<{ coupon: IVoucherItem }> = ({ coupon }) => (
  <div className="flex items-center relative  pl-0 bg-white gap-[12px] rounded-[8px] border border-[#ebebf0]">
    <div className="absolute top-3 -right-[2px]">
      <Image src={tag} alt="tag" width={24} height={18} />
      <span className="absolute inset-0 translate-x-[6px] translate-y-[2px]  text-txtthird text-10-15-700">
        x{coupon.multiplier}
      </span>
    </div>
    <div className="flex-shrink-0 size-[120px] rounded-[8px]">
      <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-500 font-bold text-sm">BLACK</div>
          <div className="text-yellow-500 font-bold text-sm">FRIDAY</div>
        </div>
      </div>
    </div>

    <div className="flex-grow space-y-[4px]">
      <div className="flex justify-between items-start">
        <h3 className="text-lg text-16-24-600">{coupon.code}</h3>
      </div>

      <p className="text-14-21-500 text-txtfifth mr-[16px] pb-[2px]">
        {coupon.discount} cho đơn hàng từ {coupon.minPurchase}K khi mua các{" "}
        {coupon.category}
      </p>
      <hr className="border-t border-[#ebebf0] border-dashed mr-[16px]" />

      <div className="flex justify-between items-center pr-[16px] pt-[4px]">
        <span className="text-12-18-500 text-txtfifth">
          HSD: {coupon.expiryDate}
        </span>
        <button className="text-txtfourth hover:underline">Điều kiện</button>
      </div>
    </div>
  </div>
);

export default VoucherItem;
