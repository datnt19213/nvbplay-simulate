import { Logo } from "@/assets/images";
import { Icon } from "@/components/common-components";
import React, { FC, HTMLAttributes, ReactNode } from "react";
import ProductItem from "./product-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CapitalizeFirstLetter,
  FormatCurrency,
  ReplaceString,
} from "@/utilities/text";
import {
  Cancel,
  Delivered,
  Delivering,
  RollbackRequest,
  WaitExec,
  WaitPayment,
} from "@/assets/icons";
import { translate } from "@/utilities/translator";
import { formatDateToDDMMYYYY } from "@/utilities/date";
import { useRouter } from "next/navigation";
import { base64UrlEncode, EncryptBasic } from "@/utilities/hash-aes";
import { ENUM } from "@/configs";

type OrderListProps = {
  status:
    | "pending"
    | "completed"
    | "draft"
    | "archived"
    | "canceled"
    | "requires_action";

  isRating?: boolean;
  data: any;
} & HTMLAttributes<HTMLDivElement>;

const OrderItem: FC<OrderListProps> = ({
  status,
  isRating = false,
  data,
  ...props
}) => {
  // const statusIcon = status === "pending" ? WaitPayment.src : status === "completed" ?
  const color =
    status === "completed" || status === "archived" || status === "canceled"
      ? "primary"
      : status === "draft" || status === "requires_action"
        ? "secondary"
        : status === "pending" && "dark";
  const textColor =
    status === "completed" || status === "archived"
      ? "text-green-primary"
      : status === "draft" || status === "requires_action"
        ? "text-txtsecondary"
        : status === "pending"
          ? "text-yellow-primary"
          : status === "canceled" && "text-red-primary";
  const btnText =
    status === "completed"
      ? "Đánh giá"
      : status === "archived"
        ? "Mua thêm"
        : status === "canceled"
          ? "Mua lại"
          : status === "draft"
            ? "Huỷ đơn"
            : status === "requires_action"
              ? "Xem chi tiết"
              : status === "pending" && "Thanh toán";
  const imgSrc =
    status === "completed"
      ? Delivered.src
      : status === "archived"
        ? Delivering.src
        : status === "canceled"
          ? Cancel.src
          : status === "draft"
            ? WaitExec.src
            : status === "requires_action"
              ? RollbackRequest.src
              : status === "pending" && WaitPayment.src;

  const router = useRouter();
  function navigateDetail(): void {
    const encodeBase64 = base64UrlEncode(
      EncryptBasic(data?.id, ENUM.SECRET_AES_TOKEN_HASH)
    );
    router.push(`/profile/order-management/${encodeBase64}`);
  }

  const handleContinueCheckout = () => {
    const encodeBase64 = base64UrlEncode(
      EncryptBasic(data?.id, ENUM.SECRET_AES_TOKEN_HASH)
    );
    router.push(`/checkout?order_id=${encodeBase64}`);
  };

  return (
    <div
      {...props}
      className="flex flex-col bg-white overflow-hidden rounded-lg animate-fade-up"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-border">
        <div className="flex gap-2 items-center text-sm font-semibold text-gray-fifth">
          <img
            src={Logo.src}
            alt="logo"
            className="rounded-full h-7 w-7 aspect-square"
          />
          <span>NVB Play</span>
        </div>
        <div
          className={cn(
            "flex gap-2 items-center font-semibold text-sm",
            textColor
          )}
        >
          <img src={imgSrc} className="w-6 h-6" />
          <span>{CapitalizeFirstLetter(translate(status))}</span>
        </div>
      </div>
      <div className="flex flex-col gap-8 py-2 px-4">
        {data?.items && data?.items?.length > 0 ? (
          data?.items?.map((item: any, index: number) => (
            <ProductItem
              key={index}
              productId={item?.product_id}
              title={item?.product_title}
              thumnail={item?.thumbnail}
              variant={item?.variant_title}
              handle_slug={item?.product_handle}
              regularPrice={item?.unit_price}
              quantity={item?.raw_quantity?.value}
            />
          ))
        ) : (
          <span className="p-4 text-gray-secondary">No products</span>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between text-sm p-4 border-t border-gray-border">
          <div>
            Ngày đặt hàng:{" "}
            <span className="font-medium">
              {data?.created_at &&
                formatDateToDDMMYYYY(
                  data?.created_at || "2100-1-01T00:00:00.000Z"
                )}
            </span>
          </div>
          <div className="flex items-center flex-wrap justify-end gap-2">
            Tổng cộng:{" "}
            <span className=" text-lg font-bold text-txtthird">
              {data?.total && FormatCurrency(data?.total)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 pb-4">
          <Button className="bg-gray-border rounded-lg text-sm font-semibold hover:bg-gray-border text-txtprimary">
            Liên hệ
          </Button>
          <div className="w-fit flex items-center justify-end gap-3">
            <Button
              className={cn(
                "bg-gray-border rounded-lg text-sm font-semibold",
                color === "primary"
                  ? "bg-txtthird hover:bg-txtthird text-white"
                  : color === "secondary"
                    ? "bg-gray-border hover:bg-gray-border text-txtprimary"
                    : color === "dark" &&
                      "bg-txtprimary hover:bg-txtprimary text-white"
              )}
              onClick={status === "pending" ? handleContinueCheckout : () => {}}
            >
              {btnText}
            </Button>
            {/* {status === "completed" && ( */}
            <Button
              onClick={() => navigateDetail()}
              className="bg-gray-border rounded-lg text-sm font-semibold hover:bg-gray-border text-txtprimary"
            >
              Xem chi tiết
            </Button>
            {/* )} */}
          </div>
          {isRating && (
            <div className="h-11 p-3 w-full bg-[#FFFCED] rounded-lg">
              <div className="text-sm font-medium">
                Đánh giá sản phẩn trước ngày{" "}
                <span className="font-semibold">17/05/2024</span>để nhận ngay{" "}
                <span className="font-bold text-[#CC8100]">
                  300 Xu NVB Loyalty
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
