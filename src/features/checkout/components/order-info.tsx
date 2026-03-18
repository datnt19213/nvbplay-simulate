import { coin } from "@/assets/icons";
import { ToastDismiss, ToastError } from "@/components/base-components/toast";
import { Button } from "@/components/ui/button";
import { ENUM } from "@/configs";
import { GlobalKeys } from "@/services/globals";
import { getGlobalKey } from "@/services/globals";
import { createPaymentLink } from "@/services/orders";
import { RootState } from "@/stores";
import { base64UrlEncode, EncryptBasic } from "@/utilities/hash-aes";
import { FormatCurrency } from "@/utilities/text";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const OrderInfo = ({
  order,
  shipping,
  paymentGateway,
  address,
  receive,
  branchPickup,
}: {
  order: any;
  shipping: any;
  paymentGateway: any;
  address: any;
  receive: string;
  branchPickup: any;
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.users_data.user);
  const DEFAULT_SHIPPING_DATA = {
    name: "NVB Play",
    phone: "0913131313",
    street: "Lê Bình, Cần Thơ",
    ward: "108",
    district: "900100",
    city: "900000",
  };
  const handleCreatePaymentLink = async () => {
    try {
      const encodeBase64 = base64UrlEncode(
        EncryptBasic(order?.id, ENUM.SECRET_AES_TOKEN_HASH)
      );
      if (receive === "shipping") {
        if (order && shipping) {
          const shipment = {
            rate: shipping.id,
            order_id: order.id,
            address_from: DEFAULT_SHIPPING_DATA,
            address_to: {
              name: address?.first_name + "",
              phone: address?.phone + "",
              street: address?.address_1 + "",
              ward: address?.metadata?.ward_id + "",
              district: address?.metadata?.district_id + "",
              city: address?.metadata?.city_id + "",
            },
            parcel: {
              cod: (order?.total || 0) + (shipping?.total_fee || 0),
              amount: (order?.total || 0) + (shipping?.total_fee || 0),
              weight: "220",
              width: "15",
              height: "15",
              length: "15",
              metadata: "Hàng dễ vỡ, vui lòng nhẹ tay.",
            },
            rate_data: shipping,
          };

          setLoading(true);
          const callbackUrl = `${getGlobalKey(GlobalKeys.CALLBACK_URL)}/checkout/result/${encodeBase64}`;
          const response = await createPaymentLink(order.id, {
            type: receive,
            total: 0,
            payment_collection_id: order.payment_collections[0].id,
            provider_code: paymentGateway,
            payment_method: "ALL",
            bankCode: "",
            customer_address_id: address?.id,
            callback_url: callbackUrl,
            shipment_data: JSON.stringify(shipment),
          });

          if (response && response?.data?.status === "success") {
            const paymentLink = response?.data?.payment_link;
            if (paymentLink) {
              window.location.href = paymentLink;
            } else {
              console.error("Payment link is undefined or null.");
              ToastError({
                msg: "Không thể tạo liên kết thanh toán. Vui lòng thử lại.",
              });
            }
          }
          setLoading(false);
        } else {
          ToastDismiss();
          ToastError({
            msg: "Vui lòng chọn đơn vị vận chuyển",
          });
        }
      } else {
        if (order && branchPickup) {
          setLoading(true);
          const callbackUrl = `${getGlobalKey(GlobalKeys.CALLBACK_URL)}/checkout/result/${encodeBase64}?status=success`;
          const response = await createPaymentLink(order.id, {
            type: receive,
            total: order.total,
            sc_id: branchPickup.id,
            payment_collection_id: order.payment_collections[0].id,
            provider_code: "",
            payment_method: "ALL",
            bankCode: "",
            customer_address_id: address?.id,
            callback_url: callbackUrl,
          });

          if (response && response?.data?.status === "success") {
            const redirectUrl = `${getGlobalKey(GlobalKeys.CALLBACK_URL)}/checkout/result/${encodeBase64}?status=success`;
            if (redirectUrl) {
              router.push(redirectUrl);
            } else {
              ToastError({
                msg: "Đã có lỗi xảy ra",
              });
            }
          }
        } else {
          ToastDismiss();
          ToastError({
            msg: "Vui lòng chọn cửa hàng gần bạn để nhận hàng",
          });
        }
      }
    } catch (error) {
      console.error("Error in handleCreatePaymentLink:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 rounded-lg bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium leading-6">Thông tin đơn hàng</h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-sm leading-5">Tổng tiền hàng</span>
            <span className="text-sm font-semibold leading-5">
              {FormatCurrency(order?.original_item_total || 0)}
            </span>
          </div>
          {shipping && receive === "shipping" && (
            <div className="flex justify-between">
              <span className="text-sm leading-5">Phí vận chuyển</span>
              <span className="text-sm font-semibold leading-5">
                {FormatCurrency(shipping?.total_fee || 0)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-sm leading-5">Mã giảm giá</span>
            <span className="text-sm font-semibold leading-5 text-green-700">
              {FormatCurrency(order?.discount_total || 0)}
            </span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-sm leading-5">NVB Loyalty</span>
            <span className="text-sm font-semibold leading-5 text-green-700">
              {FormatCurrency(0)}
            </span>
          </div> */}
          <div className="border-b border-dashed" />
          <div className="flex justify-between">
            <span className="text-sm leading-5">Tạm tính</span>
            <span className="text-xl font-semibold leading-5">
              {FormatCurrency(
                (order?.original_item_total || 0) +
                  (receive === "shipping" ? shipping?.total_fee || 0 : 0) -
                  (order?.discount_total || 0)
              )}
            </span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-sm leading-5">Thưởng</span>
            <span className="text-sm font-semibold leading-5 text-[#E59900] flex items-center gap-1">
              <img src={coin.src} alt="nvb-loyalty" className="size-5" />
              <span>+ 1.350 NVB Loyalty</span>
            </span>
          </div> */}
        </div>
      </div>
      <Button
        className="w-full rounded-lg"
        onClick={handleCreatePaymentLink}
        disabled={
          loading ||
          !order ||
          (receive === "shipping" && (!shipping || !address)) ||
          (receive === "pickup" && !branchPickup)
        }
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            <span>Đang tạo thanh toán...</span>
          </div>
        ) : (
          "Tiếp tục"
        )}
      </Button>
    </div>
  );
};

export default OrderInfo;
