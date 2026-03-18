import { coin } from "@/assets/icons";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import PointAmount from "@/features/cart/components/point-amount";
import { RootState } from "@/stores";
import { FormatCurrency } from "@/utilities/text";
import { Info } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Discount = () => {
  const { order } = useSelector((state: RootState) => state.order_slice);

  return ( 
    <div className="w-full flex flex-col gap-5 py-4 rounded-lg bg-white">
      <div className="flex items-center justify-between px-4">
        <h2 className="font-medium leading-6">Mã giảm giá</h2>
        <p className="text-sm leading-5 text-muted-foreground flex items-center gap-1">
          Có thể chọn nhiều ưu đãi
          <Info className="size-4" />
        </p>
      </div>
      <div className="flex flex-col gap-3 px-4">
        <Button
          className="w-full justify-between bg-gray-100 text-muted-foreground rounded-lg"
          variant="ghost"
        >
          <div className="flex items-center gap-2">
            <IconCustom icon="mdi:voucher" className="size-5 text-[#0d5bb5]" />
            <span>Áp dụng mã giảm giá</span>
          </div>
          <IconCustom icon="lucide:chevron-right" className="size-4" />
        </Button>
        <div className="flex items-center justify-between">
          <p className="text-sm">Đã áp dụng {order?.discount_total} ưu đãi</p>
          <p className="text-sm font-semibold text-green-700">
            {FormatCurrency(order?.discount_total || 0)}
          </p>
        </div>
      </div>
      <div className="border-b border-dashed" />
      <div className="flex flex-col px-4 gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-2">
            <img
              src={coin.src}
              alt="loyalty"
              className="size-7"
              loading="lazy"
            />
            <span className="text-sm font-medium">
              Sử dụng điểm NVB Loyalty
            </span>
          </div>
          <Switch className="data-[state=checked]:bg-[#0d5bb5]" />
        </div>
        <div className="flex flex-col gap-3 items-center w-full">
          <PointAmount amount={5} setAmount={() => {}} />
          <div className="flex items-center gap-1 text-sm">
            <p>Đang có</p>
            <p className="font-semibold">1.200.000</p>
            <p>NVB Loyalty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
