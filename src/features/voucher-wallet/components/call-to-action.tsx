import banner from "@/assets/images/banner-1.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const CallToAction = () => {
  return (
    <div className="rounded-[8px] mt-[12px] py-[24px] px-[32px] flex items-end relative overflow-hidden h-[280px] w-full">
      <Image src={banner} alt="banner" fill className="object-cover" />
      <div className="relative space-y-[16px]">
        <div className="md:text-32-48-700 text-20-30-700 text-white space-y-[16px]">
          Nhiều ưu đãi mới mỗi <br /> ngày dành cho bạn
        </div>
        <Button>Khám phá ngay</Button>
      </div>
    </div>
  );
};

export default CallToAction;
