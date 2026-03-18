import quantityTag from "@/assets/icons/quantity-tag.svg";
import singleCheckIcon from "@/assets/icons/single-check-icon.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const DiscountContainer = () => {
  return (
    <div>
      <div className="flex justify-between items-center text-sm mb-[8px]">
        <span className="font-[500] text-txtprimary">Mã giảm giá</span>
        <Link className="text-txtthird font-[600]" href={"/"}>
          Khám phá thêm
        </Link>
      </div>
      <div className="overflow-auto scrollbar-none">
        <div className="flex md:flex-wrap flex-nowrap gap-[12px] md:w-full">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <DiscountItem isUsed={index % 2 === 0} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

const DiscountItem = ({ isUsed }: { isUsed: boolean }) => {
  return (
    <div
      style={{
        flex: "0 0 auto",
      }}
      className="relative w-[238px] md:w-[calc(50%-10px)] space-y-[8px] py-[8px] px-[10px] min-h-[102px] border border-[#C2E1FF] bg-[#F0F8FF] rounded-[8px]"
    >
      <div className="absolute top-[10px] -right-[3px]">
        <Image src={quantityTag} alt="icon" width={24} height={18} />
      </div>
      <div>
        <div className="text-[#0D5BB5] font-[600] text-[16px] leading-[24px]">
          NMTNN1
        </div>
        <div className="text-[#515158] text-[12px] font-[500] leading-[18px]">
          Giảm 50K cho đơn hàng từ 200K
        </div>
      </div>
      <div className="border relative border-[#c2e1ff] border-dashed h-[0.5px] w-full">
        <svg
          className="size-[16px] absolute top-1/2 -translate-y-1/2 -left-[4px] -translate-x-full rotate-90"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 10,50 A 40,40 0 1,1 90,50"
            fill="#fff"
            stroke="#c2e1ff"
            strokeWidth="8"
          />
        </svg>
        <svg
          className="size-[16px] absolute top-1/2 -translate-y-1/2 -right-[4px] translate-x-full -rotate-90"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 10,50 A 40,40 0 1,1 90,50"
            fill="#fff"
            stroke="#c2e1ff"
            strokeWidth="8"
          />
        </svg>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[12px] font-[500] leading-[18px] italic text-[#64646D]">
          HSD: 11/04/2024
        </span>
        {isUsed ? (
          <Button
            variant={"blueOutline"}
            size={"extra"}
            className="space-x-[4px] cursor-default"
          >
            <Image src={singleCheckIcon} alt="icon" width={16} height={16} />
            Đã áp dụng
          </Button>
        ) : (
          <Button variant={"bluePrimary"} size={"extra"}>
            Áp dụng
          </Button>
        )}
      </div>
    </div>
  );
};

export default DiscountContainer;
