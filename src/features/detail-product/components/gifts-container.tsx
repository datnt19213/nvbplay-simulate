import giftIcon from "@/assets/icons/gift-icon.svg";
import giftTitleBg from "@/assets/images/gift-title-bg.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";

const GiftsContainer = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "rounded-[8px] overflow-hidden border border-[#090d14]/30",
        className
      )}
    >
      <div className="h-[44px] px-[16px] flex items-center relative">
        <Image src={giftTitleBg} alt="icon" fill className="object-cover" />
        <div className="relative text-white text-[16px] leading-[24px] font-[600]">
          Ưu đãi và quà tặng
        </div>
      </div>
      <div className="p-[16px] space-y-[8px]">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="space-x-[8px] flex items-center">
              <Image src={giftIcon} alt="icon" width={24} height={24} />
              <div className="text-[12px] leading-[18px] font-[500]">
                Sơn logo mặt vợt miễn phí
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GiftsContainer;
