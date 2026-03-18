import { FormatCurrency } from "@/utilities/text";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import VariantControllerPopover from "../popovers/variant-controller-popover";
import VariantControllerSheet from "../sheets/variant-controller-sheet";

const ComboProductItem = () => {
  return (
    <div className="md:w-[160px]  flex flex-col">
      <div className="size-[160px] relative">
        <Image
          src={"/images/product_image.png"}
          alt="product"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1 p-[12px] space-y-[4px]">
        <div className="text-[#27272a]  text-[14px] line-[21px]">
          Tên sản phẩm
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="font-[700] text-[#38383d] text-[14px] leading-[21px]">
              {FormatCurrency(200000)}
            </span>
            <span className="line-through text-[#808089] text-[12px] leading-[18px]">
              {FormatCurrency(280000)}
            </span>
          </div>
          <VariantControllerPopover
            className="hidden md:flex"
            trigger={
              <button className="size-[28px] rounded-full bg-[#0b74e5] text-white flex justify-center items-center">
                <Icon icon="line-md:plus" width="16" height="16" />
              </button>
            }
          />
          <VariantControllerSheet
            type={"attach"}
            className="md:hidden"
            trigger={
              <button className="size-[28px] rounded-full bg-[#0b74e5] text-white flex justify-center items-center">
                <Icon icon="line-md:plus" width="16" height="16" />
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ComboProductItem;
