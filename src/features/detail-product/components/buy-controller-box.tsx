import productImg from "@/assets/images/product-item.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormatCurrency } from "@/utilities/text";
import Image from "next/image";
import NVBCoinBox from "./atom/nvb-coin-box";
import QuantityController from "./atom/quantity-controller";
import CallToAction3 from "./ctas/call-to-action-3";
import CallToAction4 from "./ctas/call-to-action-4";

interface IProps {
  className?: string;
  showProduct?: boolean;
  type?: "main-cta3" | "attach" | "main-cta4";
}

const BuyControllerBox: React.FC<IProps> = ({
  className,
  showProduct = false,
  type = "main-cta3",
}) => {
  const items = [
    {
      label: "Màu sắc",
      value: "Đen",
    },
    {
      label: "Kích thước",
      value: "S (146 - 152cm, 39 - 61kg)",
    },
  ];

  const AttachRender = () => {
    return (
      <>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-icon">Tạm tính</span>
          <span className="text-txtthird text-[18px] leading-[27px] font-[700]">
            {FormatCurrency(1350000)}
          </span>
        </div>
        <div className="flex gap-[8px]">
          <Button className="flex-1" variant={"ghost"}>
            Hủy bỏ
          </Button>
          <Button className="flex-1">Xác nhận</Button>
        </div>
      </>
    );
  };

  const MainCt3Render = () => {
    return (
      <>
        <div className="flex justify-between text-sm items-center">
          <NVBCoinBox />
          <span className="text-txtthird text-[18px] leading-[27px] font-[700]">
            {FormatCurrency(1350000)}
          </span>
        </div>
        <CallToAction3 />
      </>
    );
  };

  const MainCt4Render = () => {
    return (
      <>
        <div className="flex justify-between text-sm items-center">
          <NVBCoinBox />
          <span className="text-txtthird text-[18px] leading-[27px] font-[700]">
            {FormatCurrency(1350000)}
          </span>
        </div>
        <CallToAction4 />
      </>
    );
  };

  return (
    <div
      className={cn(
        "space-y-[24px] p-[16px] w-full text-txtprimary font-[500]",
        className
      )}
    >
      {showProduct && (
        <div className="flex gap-[12px] items-end">
          <div className="w-[100px] aspect-square min-w-[100px] relative">
            <Image
              src={productImg}
              alt="product"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-[8px]">
            {items.map((i) => (
              <div className="text-sm">
                <span className="text-gray-icon">{i.label}: </span>
                <span className="font-[600]">{i.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <ColorContainer />
      <SizeContainer /> */}
      <QuantityController className="justify-between" />
      {type === "main-cta3" ? (
        <MainCt3Render />
      ) : type === "main-cta4" ? (
        <MainCt4Render />
      ) : (
        <AttachRender />
      )}
    </div>
  );
};

export default BuyControllerBox;
