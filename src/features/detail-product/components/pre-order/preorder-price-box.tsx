import preOrderBg from "@/assets/images/pre-order-titlt-bg.jpg";
import Image from "next/image";
import PriceBox from "../atom/price-box";

const PreOrderPriceBox = () => {
  return (
    <div className="rounded-[8px] overflow-hidden border border-[#ebebf0]">
      <div className="h-[44px] relative  flex items-center px-[16px]">
        <Image
          src={preOrderBg}
          alt="title"
          fill
          className="object-cover object-left"
        />
        <div className="relative text-[16px] leading-[24px] font-[600]  text-white">
          Hàng sắp về
        </div>
      </div>
      <div className="p-[16px]">
        <PriceBox type="pre-order" discount={10} coin={1000} />
      </div>
    </div>
  );
};

export default PreOrderPriceBox;
