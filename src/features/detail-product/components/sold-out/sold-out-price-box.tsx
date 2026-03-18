import soldOut from "@/assets/images/sold-out-alert.svg";
import Image from "next/image";
import PriceBox from "../atom/price-box";

const SoldOutPriceBox = () => {
  return (
    <div className="space-y-[12px]">
      <PriceBox />
      <div className="h-[109px] relative p-[16px]">
        <Image src={soldOut} alt="alert" fill className="object-cover" />
        <div className="relative space-y-[8px] max-w-[304px]">
          <div className="text-[18px] leading-[27px] font-[600] text-red-primary">
            Sản phẩm tạm hết hàng
          </div>
          <div className="text-gray-icon text-sm font-[500]">
            Vui lòng để lại thông tin của bạn, chúng tôi sẽ liên hệ khi có cập
            nhật về sản phẩm.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldOutPriceBox;
