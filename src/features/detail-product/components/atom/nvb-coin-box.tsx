import nvbCoin from "@/assets/icons/nvb-coin.svg";
import Image from "next/image";

const NVBCoinBox = () => {
  return (
    <div className="border-[#ffe880] pr-[6px] bg-[#fff5c7] p-[2px] rounded-full border flex gap-2 items-center md:mt-[8px] w-fit">
      <Image src={nvbCoin} alt="icon" width={20} height={20} />
      <span className="text-[#cc8100] text-[12px] leading-[18px] font-[600]">
        +1.350 NVB Loyalty
      </span>
    </div>
  );
};

export default NVBCoinBox;
