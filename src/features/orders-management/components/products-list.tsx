"use client";
import { Logo } from "@/assets/images";
import { ButtonSubmitPrimary } from "@/components/base-components/buttons";
import { Icon } from "@/components/common-components";
import { Button } from "@/components/ui/button";
import ProductItem from "@/features/checkout/elements/product-item";
import { RootState } from "@/stores";
import { FormatCurrency } from "@/utilities/text";
import Link from "next/link";
import { useSelector } from "react-redux";
import CancelDialogConfirm from "./cancel-dialog-confirm";
import { CancelOrderModal } from "./cancel-order-modal";

const OrderProductsList = () => {
  const { orderDetail } = useSelector(
    (state: RootState) => state.order_data_slice
  );
  // const handleContactSeller = () => {
  //   redirect("/", RedirectType.push);
  // };
  return (
    <div className="w-full flex-col flex bg-white overflow-hidden rounded-lg animate-fade-up">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2 items-center text-sm font-semibold text-gray-fifth">
          <img
            src={Logo.src}
            alt="logo"
            className="rounded-full h-7 w-7 aspect-square"
          />
          <span>NVB Play</span>
        </div>
        <div className="flex gap-2 items-center font-semibold text-sm text-gray-icon">
          <Icon icon="ph:chat-circle-dots" fontSize={24} />
          <span>Nhắn tin</span>
        </div>
      </div>
      <div className="p-4 flex flex-col w-full gap-8">
        {orderDetail?.items?.map((item: any) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
      <div className="pt-4 pb-2 px-4 flex justify-end border-t rounded-lg border-gray-border gap-2">
        <span className="font-medium text-[#64646D]">Tổng tiền hàng:</span>
        <span className="font-semibold text-txtprimary">
          {FormatCurrency(orderDetail?.original_item_total || 0)}
        </span>
      </div>
      {!!orderDetail?.shipping_total && orderDetail?.shipping_total > 0 && (
        <div className="pb-2 px-4 flex justify-end rounded-lg gap-2">
          <span className="font-medium text-[#64646D]">Phí vận chuyển:</span>
          <span className="font-semibold text-txtprimary">
            {FormatCurrency(orderDetail?.shipping_total || 0)}
          </span>
        </div>
      )}
      <div className="pb-4 px-4 flex justify-end rounded-lg gap-2">
        <span className="font-medium text-[#64646D]">Tổng cộng:</span>
        <span className="font-semibold text-txtprimary">
          {FormatCurrency(orderDetail?.total || 0)}
        </span>
      </div>
      <div className="px-4 pb-4 flex justify-between rounded-lg flex-wrap gap-3">
        <ButtonSubmitPrimary
          className="bg-gray-icon hover:bg-gray-icon w-full md:w-fit pl-2.5 py-2 pr-3"
          // onClick={() => handleContactSeller()}
        >
          <Icon icon="ph:chat-circle-dots" fontSize={24} />
          Liên hệ người bán
        </ButtonSubmitPrimary>
        <div className="w-full md:w-fit flex justify-between md:justify-end items-center gap-3">
          {orderDetail?.status === "pending" && (
            // <CancelOrderModal>
            //   <Button variant={"grayPrimary"} className="w-full md:w-fit ">Hủy đơn</Button>
            // </CancelOrderModal>
            <CancelDialogConfirm orderId={orderDetail?.id} />
          )}
          {/* {orderDetail?.status === "completed" && (
            // <Button variant={"outline"} className="w-full md:w-fit">
            //   Hoàn hàng
            // </Button>
            <CancelOrderModal
              children={
                <Button variant={"outline"} className="w-full md:w-fit">
                  Hoàn hàng
                </Button>
              }
            />
          )} */}
          <Link href="/">
            <ButtonSubmitPrimary className="w-full md:w-fit">
              Mua thêm
            </ButtonSubmitPrimary>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderProductsList;
