import { FormatCurrency } from "@/utilities/text";
import Image from "next/image";

const SelectedProductItem = () => {
  return (
    <div className="flex gap-[8px] items-center">
      <span className="text-[#64646d] text-[16px]">1x</span>
      <div className="flex gap-[8px] flex-1">
        <div className="w-[48px] h-[48px] relative flex justify-center items-center">
          <div className="w-[21px] h-[28px] relative">
            <Image
              src={"/images/product_image.png"}
              alt="product"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="text-[14px] leading-[21px] flex flex-col">
          <span className="text-[#27272a]">ÁO DS DS23-01</span>
          <span className="text-[#808089]">S, Trắng đen</span>
        </div>
      </div>
      <div className="text-[14px] leading-[21px] flex flex-col">
        <span className="font-[700]">{FormatCurrency(200000)}</span>
        <button className="text-[#0b74e5] font-[600]">Chỉnh sửa</button>
      </div>
    </div>
  );
};

export default SelectedProductItem;
