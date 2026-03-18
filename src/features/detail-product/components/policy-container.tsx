import checklistIcon from "@/assets/icons/checklist-icon.svg";
import starIcon from "@/assets/icons/star-icon.svg";
import policyTitleBg from "@/assets/images/policy-title-bg.svg";
import Image from "next/image";

const PolicyContainer = () => {
  return (
    <div className="rounded-[8px] overflow-hidden border border-[#090d14]/30">
      <div className="h-[44px] px-[16px] flex items-center relative">
        <Image src={policyTitleBg} alt="icon" fill className="object-cover" />
        <div className="relative flex gap-[8px] items-center">
          <Image src={starIcon} alt="icon" width={24} height={24} />
          <div className="relative text-transparent bg-clip-text bg-gradient-to-l from-[#e6be8e] via-[#fce7d2] to-[#fce7d2]  text-[16px] leading-[24px] font-[600]">
            Ưu đãi và quà tặng
          </div>
        </div>
      </div>
      <div className="p-[16px] space-y-[8px]">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="space-x-[8px] flex items-center">
              <Image src={checklistIcon} alt="icon" width={24} height={24} />
              <div className="text-[12px] leading-[18px] font-[500] ">
                Hậu mãi độc quyền
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PolicyContainer;
