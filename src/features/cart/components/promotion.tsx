import { coin } from "@/assets/icons";
import { Switch } from "@/components/ui/switch";
import { FormatCurrency } from "@/utilities/text";
import { Info } from "lucide-react";
import PointAmount from "./point-amount";
import PromotionDialog from "./promotion-dialog";

const getListPromotionCanApply = (promotions: any) => {
  const listPromotions = promotions.filter((pro: any) => {
    if (pro?.rules?.length < 1) {
      console.log("satisfied promotion: ", pro);
      return pro;
    }
  });
  return listPromotions;
};

const PromotionOrder = ({
  data,
}: {
  data: any;
}) => {
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
        <PromotionDialog
          data={data}
        />
        {data?.promotions?.length > 0 ? (
          <div className="flex items-center justify-between">
            <p className="text-sm">
              Đã áp dụng {data?.promotions?.length} ưu đãi
            </p>
            <p className="text-sm font-semibold text-green-700">
              -{FormatCurrency(data?.discount_total || 0)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Chọn ưu đãi dành cho bạn!
          </p>
        )}
      </div>
      {/* <div className="border-b border-dashed" />
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
      </div> */}
    </div>
  );
};

export default PromotionOrder;
