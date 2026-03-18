import {
  toastNVB
} from "@/components/base-components/toast";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FormatCurrency } from "@/utilities/text";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

const DetailOrder = ({
  order,
  isLoading,
  orderId,
}: {
  order: any;
  isLoading: boolean;
  orderId: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    }
  }, [isCopied]);
  return (
    <div className="w-full flex flex-col gap-5 p-4 rounded-lg bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium leading-6">Thông tin đơn hàng</h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-sm leading-5 text-[#64646D]">
              Mã đơn hàng
            </span>

            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold leading-5 max-w-[100px] truncate">
                  {order?.id}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "hover:text-primary size-5",
                    isCopied && "text-primary"
                  )}
                  onClick={() => {
                    navigator.clipboard.writeText(order?.id);
                    toastNVB({
                      msg: "Đã sao chép mã đơn hàng",
                      type: "success",
                    });
                    setIsCopied(true);
                  }}
                >
                  {isCopied ? (
                    <IconCustom icon="lucide:check" fontSize={20} />
                  ) : (
                    <IconCustom
                      icon="ph:copy"
                      fontSize={20}
                      strokeWidth={1.5}
                      className="text-[#0B74E5] "
                    />
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-sm leading-5 text-[#64646D]">
              Ngày đặt hàng
            </span>
            <span className="text-sm font-semibold leading-5">
              {isLoading ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                formatDate(order?.created_at || new Date(), "dd/MM/yyyy")
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm leading-5 text-[#64646D]">
              Tổng tiền hàng
            </span>
            <span className="text-sm font-semibold leading-5">
              {isLoading ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                FormatCurrency(order?.original_item_total || 0)
              )}
            </span>
          </div>
          {order?.shipping_total > 0 && (
            <div className="flex justify-between">
              <span className="text-sm leading-5 text-[#64646D]">
                Phí vận chuyển
              </span>
              <span className="text-sm font-semibold leading-5">
                {FormatCurrency(order?.shipping_total)}
              </span>
            </div>
          )}
          {order?.discount_total > 0 && (
            <div className="flex justify-between">
              <span className="text-sm leading-5 text-[#64646D]">
                Mã giảm giá
              </span>
              <span className="text-sm font-semibold leading-5 text-[#079449]">
                -{FormatCurrency(order?.discount_total)}
              </span>
            </div>
          )}
          <div className="border-b border-dashed" />

          <div className="flex justify-between">
            <span className="text-sm leading-5 text-[#64646D]">Tổng cộng</span>
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <span className="text-lg font-semibold leading-5 text-primary">
                {FormatCurrency(order?.total || 0)}
              </span>
            )}
          </div>

          {/* <div className="flex justify-between">
            <span className="text-sm leading-5 text-[#64646D]">Thưởng</span>
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <span className="text-sm font-semibold leading-5 text-[#E59900] flex items-center gap-1">
                <img src={coin.src} alt="nvb-loyalty" className="size-5" />
                <span>+ {0} NVB Loyalty</span>
              </span>
            )}
          </div> */}
        </div>
      </div>
      <Button className="w-full rounded-lg" asChild>
        <Link href={`/profile/order-management/${orderId}`}>Xem chi tiết</Link>
      </Button>
    </div>
  );
};

export default DetailOrder;
