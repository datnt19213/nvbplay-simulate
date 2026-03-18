import discountIcon from "@/assets/icons/discount-icon.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
import NVBCoinBox from "./nvb-coin-box";

interface IProps {
  className?: string;
  coin?: number;
  discount?: number | string;
  type?: "pre-order" | "normal";
  originalPrice?: string;
  discountPercent?: string;
}

const PriceBox: React.FC<IProps> = ({
  className,
  coin,
  discount,
  discountPercent,
  type = "normal",
  originalPrice,
}) => {
  const NormalRender = () => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <div
            className={cn("text-txtthird font-bold text-[28px] leading-[42px]")}
          >
            {originalPrice}
          </div>
          {discount && (
            <div className="space-x-4">
              <span className="text-txtsecondary text-[14px] leading-[21px] line-through">
                {discount}
              </span>
              <span className="text-[#ff424e] text-[12px] leading-[18px] font-[600]">
                {discountPercent}
              </span>
            </div>
          )}
        </div>
        {coin && <NVBCoinBox />}
      </div>
    );
  };

  const PreOrderRender = () => {
    return (
      <div className="space-y-[20px]">
        <div className="flex flex-row justify-between items-start">
          <div>
            <div
              className={cn(
                "text-[#0b74e5] font-bold text-[28px] leading-[42px]"
              )}
            >
              1.350.000 đ
            </div>
            {discount && (
              <div className="space-x-4">
                <span className="text-txtsecondary text-[14px] leading-[21px] line-through">
                  1.900.000 đ
                </span>
                <span className="text-[#ff424e] text-[12px] leading-[18px] font-[600]">
                  -31%
                </span>
              </div>
            )}
          </div>
          <div className="p-[3px] pr-[6px] border mt-[8px] border-[#c2e1ff] bg-[#dbeeff] rounded-full flex gap-[4px]">
            <Image src={discountIcon} alt="icon" width={20} height={20} />
            <span className="text-sm font-[600] text-[#0d5bb5]">
              Giá đặt trước
            </span>
          </div>
        </div>
        <div>{coin && <NVBCoinBox />}</div>
        <div className="text-sm font-[500] text-gray-icon">
          Sản phẩm sắp cặp bến hệ thống cửa hàng NVB Play, đặt trước để nhận
          ngay nhiều ưu đãi hấp dẫn!
        </div>
      </div>
    );
  };

  if (type === "normal") return <NormalRender />;
  return <PreOrderRender />;
};

export default PriceBox;
