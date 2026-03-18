import { banner_deal } from "@/assets/images";
import Image from "@/components/base-components/images/image";

const DealBanner = () => {
  return (
    <div>
      <Image
        src={banner_deal.src}
      className="h-[7.5rem] w-fit !object-contain rounded-lg overflow-hidden hidden desktop:block"
      />
      <div className="h-[7.5rem] bg-[#020203] inline-block desktop:hidden" />
    </div>
  );
};

export default DealBanner;