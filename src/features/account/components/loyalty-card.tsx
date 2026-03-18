import { bg_coin, coin, vector } from "@/assets/icons";
import { Icon } from "@iconify/react";

const LoyaltyCard = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {/* CARD NVB */}
      <div className="relative rounded-lg overflow-hidden group bg-gradient-to-b from-[#1A1A1A] to-[#271D1D] cursor-pointer h-[95px]">
        {/* Animated */}
        <div className="absolute z-[2] bg-gradient-to-r from-transparent top-0 -left-full group-hover:left-full transition-all duration-500 ease-linear h-full w-full group-hover:via-gray-100/15 dark:via-gray-100/10 to-transparent" />

        <img src={vector.src} className="absolute right-0 top-0 z-[1]" />
        <div className="flex flex-col gap-1 px-3 py-3 text-white">
          <p className="text-xs">Ví NVB Play</p>
          <p className="text-sm font-semibold">0 đ</p>
        </div>
        <div className="h-[2rem]">
          <div className="h-full px-3 py-1 flex justify-between items-center text-white bg-gradient-to-r from-white/5 to-white/20">
            <div className="flex items-center text-xs gap-1">
              <Icon icon="fa6-solid:money-check-dollar" className="size-5" />
              Nạp tiền
            </div>
            <Icon icon="ph:caret-right" className="size-5" />
          </div>
        </div>
      </div>
      {/* CARD LOYALTY*/}
      <div className="relative rounded-lg overflow-hidden group bg-[#C58D15] cursor-pointer h-[95px]">
        {/* Animated */}
        <div className="absolute z-[2] bg-gradient-to-r from-transparent top-0 -left-full group-hover:left-full transition-all duration-500 ease-linear h-full w-full group-hover:via-gray-100/15 dark:via-gray-100/10 to-transparent" />
        <img src={bg_coin.src} className="absolute right-0 top-1" />
        <div className="flex flex-col gap-1 px-3 py-3 text-white">
          <p className="text-xs">Đang có</p>
          <p className="text-sm font-semibold">100.000.000</p>
        </div>
        <div className="h-[2rem]">
          <div className="h-full px-3 py-1 flex justify-between items-center text-white bg-gradient-to-r from-[#C58D15] to-[#E5BB48]">
            <div className="flex items-center text-xs gap-1">
              <img src={coin.src} />
              NVB Loyalty
            </div>
            <Icon icon="ph:caret-right" className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
