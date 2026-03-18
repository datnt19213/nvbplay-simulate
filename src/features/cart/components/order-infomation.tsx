import { coin } from "@/assets/icons";
import { ToastDismiss, ToastError } from "@/components/base-components/toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ENUM } from "@/configs";
import { useCarts } from "@/hooks/queries/cart";
import {
  completeCart,
  createCart,
  createPaymentCollection,
  initializePaymentSession,
  removeCartItem,
} from "@/services/cart";
import { RootState } from "@/stores";
import {
  removeItem,
  setCartData,
  setIsLoading,
} from "@/stores/datas/cart-slice";
import { setOrderData } from "@/stores/datas/order-slice";
import { base64UrlEncode, EncryptBasic } from "@/utilities/hash-aes";
import { FormatCurrency } from "@/utilities/text";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderInfomation = ({
  data,
  totalPrices,
  activeItems,
}: {
  data: any;
  totalPrices: any;
  activeItems: string[];
}) => {
  const isLoading = useSelector(
    (state: RootState) => state.cart_slice.isLoading
  );
  const { updateProductQuantity } = useCarts();
  const { user } = useSelector((state: RootState) => state.users_data);
  const router = useRouter();
  const dispatch = useDispatch();

  const getItemNotActive = (): string[] => {
    return data?.items
      .filter((item: any) => !activeItems.includes(item.id))
      .map((item: any) => item.id);
  };

  const updateActiveItemsQuantity = async () => {
    for (const item of data.items) {
      if (activeItems.includes(item.id)) {
        await updateProductQuantity.updateProductQuantityMutationAsync({
          cartId: data.id,
          lineItemId: item.id,
          quantity: item.quantity,
        });
      }
    }
  };

  const removeInactiveItems = async () => {
    const notActiveItems = getItemNotActive();
    for (const itemId of notActiveItems) {
      await removeCartItem(data.id, itemId);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      dispatch(setIsLoading(true));

      // Update quantities for active items
      await updateActiveItemsQuantity();

      // Remove inactive items
      await removeInactiveItems();

      const orderResponse: any = await completeCart(data.id);
      if (orderResponse) {
        // Update Redux and localStorage
        const newCart = await createCart(user?.email);
        localStorage.setItem("cart_id", newCart?.cart?.id);
        dispatch(setCartData(newCart.cart));

        // Redirect to checkout
        const orderID = EncryptBasic(
          orderResponse.data,
          ENUM.SECRET_AES_TOKEN_HASH
        );
        router.push(`/checkout?order_id=${base64UrlEncode(orderID)}`);
      }
    } catch (error) {
      console.error(error);
      ToastDismiss();
      ToastError({
        msg: "Có lỗi xảy ra khi xử lý đơn hàng: " + error,
        duration: 5000,
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 rounded-lg bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium leading-6">Thông tin đơn hàng</h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-sm leading-5">Tổng tiền hàng</span>
            {isLoading ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              <span className="text-sm font-semibold leading-5">
                {FormatCurrency(totalPrices?.total_item || 0)}
              </span>
            )}
          </div>
          {data?.discount_total > 0 && (
            <div className="flex justify-between">
              <span className="text-sm leading-5">Mã giảm giá</span>
              {isLoading ? (
                <Skeleton className="h-5 w-20" />
              ) : (
                <span className="text-sm font-semibold leading-5 text-green-700">
                  {`-${FormatCurrency(data?.discount_total || 0)}`}
                </span>
              )}
            </div>
          )}
          {/* <div className="flex justify-between">
            <span className="text-sm leading-5">NVB Loyalty</span>
            {isLoading ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              <span className="text-sm font-semibold leading-5 text-green-700">
                {FormatCurrency(0)}
              </span>
            )}
          </div> */}
          <div className="border-b border-dashed" />
          <div className="flex justify-between">
            <span className="text-sm leading-5">Tạm tính</span>
            {isLoading ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              <span className="text-xl font-semibold leading-5">
                {FormatCurrency(
                  (totalPrices?.total_item || 0) - (data?.discount_total || 0)
                )}
              </span>
            )}
          </div>
          {/* <div className="flex justify-between">
            <span className="text-sm leading-5">Thưởng</span>
            {isLoading ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              <span className="text-sm font-semibold leading-5 text-[#E59900] flex items-center gap-1">
                <img src={coin.src} alt="nvb-loyalty" className="size-5" />
                {`+ ${data?.loyalty_points || 0} NVB Loyalty`}
              </span>
            )}
          </div> */}
        </div>
      </div>
      <Button
        className="w-full rounded-lg"
        onClick={handleConfirmOrder}
        disabled={isLoading || activeItems?.length === 0}
      >
        {isLoading ? (
          <>
            <Loader className="size-4 animate-spin" />
            <span>Đang xử lý...</span>
          </>
        ) : (
          <span>Tiếp tục</span>
        )}
      </Button>
    </div>
  );
};

export default OrderInfomation;
