import ProductItem from "@/features/checkout/elements/product-item";
import { RootState } from "@/stores";
import React from "react";
import { useSelector } from "react-redux";
import OrderPaymentMethod from "./order-payment-method";
import { FormatCurrency } from "@/utilities/text";
import Image from "next/image";
import { coin } from "@/assets/icons";
import { Button } from "@/components/ui/button";

export const CancelOrderFeature = () => {
  const { orderDetail } = useSelector(
    (state: RootState) => state.order_data_slice
  );

  return (
    <div>
      <div className="bg-white p-4 rounded-lg">
        <div className="p-4 flex flex-col w-full gap-8">
          {orderDetail?.items?.map((item: any) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 mt-3 rounded-lg">
        <div className="w-full col-span-1 md:col-span-7">
          <div className="bg-white p-4 space-y-2">
            <div className="text-lg font-semibold">Lý do hủy đơn</div>
            <div className="text-base text-neutral-700">
              Tôi muốn thay đổi phương thức thanh toán
            </div>
          </div>
          <div className="mt-3">
            <OrderPaymentMethod showTimeline={false} />
          </div>
        </div>
        <div className="w-full col-span-1 md:col-span-5">
          <div className="w-full flex flex-col p-4 rounded-lg bg-white">
            <div className="text-lg font-semibold mb-4">Chi tiết hoàn tiền</div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="text-base font-medium text-neutral-500">
                  Hoàn tiền sản phẩm
                </div>
                <div className="text-base font-semibold">
                  {FormatCurrency(
                    orderDetail?.payment_collections[0].amount || 0
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-base font-medium text-neutral-500">
                  Hoàn tiền vận chuyển
                </div>
                <div className="text-base font-semibold">
                  {FormatCurrency(30000)}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-base font-medium text-neutral-500">
                  Hoàn Xu NVB Loyalty
                </div>
                <div className="flex items-center gap-1">
                  <Image src={coin.src} alt="coin" width={24} height={24} />
                  <div className="text-base font-semibold">
                    {FormatCurrency(1350)}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-neutral-200 my-4" />

            <div className="flex justify-between">
              <div className="text-base font-medium text-neutral-500">
                Tổng hoàn tiền
              </div>
              <div className="flex items-center gap-1">
                <Image src={coin.src} alt="coin" width={24} height={24} />
                <div className="text-base font-semibold">
                  {FormatCurrency(
                    orderDetail?.payment_collections[0].amount || 0
                  )}
                </div>
              </div>
            </div>

            <Button variant={"destructive"} className="w-full mt-5">
              Hủy đơn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
