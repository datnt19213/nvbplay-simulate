import { coin } from "@/assets/icons";
import { Switch } from "@/components/ui/switch";
import PointAmount from "@/features/cart/components/point-amount";
import PromotionDialog from "@/features/cart/components/promotion-dialog";
import { FormatCurrency } from "@/utilities/text";

export const SubcriblePromotion = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4">
        <h2 className="font-semibold md:font-medium leading-6">Mã giảm giá</h2>
        {/* <p className="text-sm leading-5 text-muted-foreground flex items-center gap-1">
          Có thể chọn nhiều ưu đãi
          <Info className="size-4" />
        </p> */}
      </div>
      <div className="flex flex-col gap-3 px-4">
        <div className="bg-gray-200 rounded-lg md:bg-transparent">
        <PromotionDialog data={[]} />
        </div>
        {true ? (
          <div className="flex items-center justify-between">
            <p className="text-sm">Đã áp dụng 3 ưu đãi</p>
            <p className="text-sm font-semibold text-green-700">
              -{FormatCurrency(200000)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Chọn ưu đãi dành cho bạn!
          </p>
        )}
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
    </>
  );
};
