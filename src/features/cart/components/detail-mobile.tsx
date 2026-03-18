import { bg_coin, coin, vector } from "@/assets/icons";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronRight, ChevronUp, Loader } from "lucide-react";
import React from "react";
import PointAmount from "./point-amount";
import { FormatCurrency } from "@/utilities/text";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { completeCart, createCart, removeCartItem } from "@/services/cart";
import { RootState } from "@/stores";
import { setCartData, setIsLoading } from "@/stores/datas/cart-slice";
import { base64UrlEncode, EncryptBasic } from "@/utilities/hash-aes";
import { ENUM } from "@/configs";
import { ToastDismiss, ToastError } from "@/components/base-components/toast";
import { Skeleton } from "@/components/ui/skeleton";
import PromotionDialog from "./promotion-dialog";
import { useCarts } from "@/hooks/queries/cart";

const DetailOrderMobile = ({
  data,
  totalPrices,
  activeItems,
}: {
  data: any;
  totalPrices: any;
  activeItems: any;
}) => {
  const isLoading = useSelector(
    (state: RootState) => state.cart_slice.isLoading
  );
  const { user } = useSelector((state: RootState) => state.users_data);
  const router = useRouter();
  const dispatch = useDispatch();
  const { updateProductQuantity } = useCarts();

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
    <div className="fixed h-[110px] shadow-[0px_-5px_10px_0px_#0000001F] bottom-0 inset-x-0 z-50 desktop:hidden w-full bg-white">
      <div className="flex flex-col divide-y">
        <PromotionDialog data={data} />

        {/* <Sheet>
          <SheetTrigger asChild>
            <div className="py-2.5 px-4 flex justify-between">
              <div className="flex items-center gap-1">
                <img src={coin.src} className="size-5" />
                <span className="text-sm">NVB Loyalty</span>
              </div>
              <div className="flex items-center gap-0.5">
                <p className="flex items-center gap-1 text-sm">
                  <span>Đang có</span>
                  <span className="font-semibold">1.200.000đ</span>
                  <span>Loyalty</span>
                </p>
                <ChevronRight className="size-5 text-gray-500" />
              </div>
            </div>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="min-h-[328px] rounded-t-lg p-0"
          >
            <VisuallyHidden>
              <SheetHeader>
                <SheetTitle>Title</SheetTitle>
                <SheetDescription>Description</SheetDescription>
              </SheetHeader>
            </VisuallyHidden>
            <div className="flex justify-center items-center border-b px-4 pt-3 pb-2">
              <h2 className="text-center font-bold">NVB Loyalty</h2>
            </div>
            <div className="flex w-full flex-col gap-4 p-4">
              <div className="grid grid-cols-12 items-center gap-2">
               
                <div className="relative rounded-lg overflow-hidden group bg-[#C58D15] cursor-pointer min-h-[95px] max-h-[100px] col-span-7">
                 
                  <div className="absolute z-[2] bg-gradient-to-r from-transparent top-0 -left-full group-hover:left-full transition-all duration-500 ease-linear h-full w-full group-hover:via-gray-100/15 dark:via-gray-100/10 to-transparent" />
                  <img src={bg_coin.src} className="absolute right-0 top-1" />
                  <div className="flex flex-col gap-1 px-3 py-3 text-white">
                    <p className="text-xs">Đang có</p>
                    <p className="text-sm font-semibold">100.000.000</p>
                  </div>
                  <div className="h-[2rem]">
                    <div className="h-full px-3 py-1 flex justify-between items-center text-white bg-gradient-to-r from-[#C58D15] to-[#E5BB48]">
                      <div className="flex items-center text-xs gap-1">
                        <img src={coin.src} />
                        NVB Loyalty
                      </div>
                      <IconCustom icon="ph:caret-right" className="size-4" />
                    </div>
                  </div>
                </div>
              
                <div className="relative rounded-lg overflow-hidden group bg-gradient-to-b from-[#1A1A1A] to-[#271D1D] cursor-pointer min-h-[95px] max-h-[100px] col-span-5">
                  
                  <div className="absolute z-[2] bg-gradient-to-r from-transparent top-0 -left-full group-hover:left-full transition-all duration-500 ease-linear h-full w-full group-hover:via-gray-100/15 dark:via-gray-100/10 to-transparent" />

                  <img
                    src={vector.src}
                    className="absolute right-0 top-0 z-[1]"
                  />
                  <div className="flex flex-col gap-1 px-3 py-3 text-white">
                    <p className="text-xs">Nhiều ưu đãi hơn với</p>
                    <p className="text-sm font-semibold">Hội viên NVB</p>
                  </div>
                  <div className="h-[2rem]">
                    <div className="h-full px-3 py-1 flex justify-between items-center text-white bg-gradient-to-r from-white/5 to-white/20">
                      <div className="flex items-center text-xs gap-1">
                        Xem chi tiết
                      </div>
                      <IconCustom icon="ph:caret-right" className="size-4" />
                    </div>
                  </div>
                </div>
              </div>
              <PointAmount amount={5} setAmount={() => {}} />
            </div>
            <div className="flex justify-center flex-1 items-center border-t px-4 py-2">
              <Button className="w-full">Áp dụng</Button>
            </div>
          </SheetContent>
        </Sheet> */}

        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Checkbox className="size-5 rounded border-gray-200 bg-gray-100 data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800" />
            <Label className="text-sm text-gray-700">Tất cả</Label>
          </div>
          <div className="flex flex-1 justify-end items-end gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex flex-col justify-end items-end cursor-pointer">
                  <p className="text-xl text-right text-primary font-semibold flex items-center gap-1">
                    {FormatCurrency(
                      totalPrices && totalPrices?.total_item
                        ? (totalPrices?.total_item || 0) -
                            (data?.discount_total || 0)
                        : 0
                    )}
                    <ChevronUp className="size-4" />
                  </p>
                  {/* <p className="text-sm flex items-center gap-1">
                    <span>Thưởng</span>
                    <span className="flex items-center gap-1">
                      <img src={coin.src} className="size-4" />
                      <span className="text-[#E59900] font-semibold">
                        +1.350
                      </span>
                    </span>
                  </p> */}
                </div>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="min-h-[250px] rounded-t-lg p-0"
              >
                <VisuallyHidden>
                  <SheetHeader>
                    <SheetTitle>Title</SheetTitle>
                    <SheetDescription>Description</SheetDescription>
                  </SheetHeader>
                </VisuallyHidden>
                <div className="flex justify-center items-center border-b px-4 pt-3 pb-2">
                  <h2 className="text-center font-bold">Thông tin đơn hàng</h2>
                </div>
                <div className="flex flex-col h-full justify-between">
                  {/* Prices */}
                  <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <span className="text-sm leading-5">
                          Tổng tiền hàng
                        </span>
                        <span className="text-sm font-semibold leading-5">
                          {isLoading ? (
                            <Skeleton className="w-20 h-5" />
                          ) : (
                            <span className="text-sm font-semibold leading-5">
                              {FormatCurrency(totalPrices?.total_item || 0)}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm leading-5">Mã giảm giá</span>
                        <span className="text-sm font-semibold leading-5 text-green-700">
                          {isLoading ? (
                            <Skeleton className="w-20 h-5" />
                          ) : (
                            <span className="text-sm font-semibold leading-5">
                              {FormatCurrency(
                                totalPrices && totalPrices?.total_item
                                  ? data?.discount_total
                                  : 0
                              )}
                            </span>
                          )}
                        </span>
                      </div>
                      {/* <div className="flex justify-between">
                      <span className="text-sm leading-5">NVB Loyalty</span>
                      <span className="text-sm font-semibold leading-5 text-green-700">
                        {isLoading ? (
                          <Skeleton className="w-20 h-5" />
                        ) : (
                          <span className="text-sm font-semibold leading-5">
                            {FormatCurrency(0)}
                          </span>
                        )}
                      </span>
                    </div> */}
                      <div className="border-b border-dashed" />
                      <div className="flex justify-between">
                        <span className="text-sm leading-5">Tạm tính</span>
                        <span className="text-xl font-semibold leading-5 text-primary">
                          {isLoading ? (
                            <Skeleton className="w-20 h-5" />
                          ) : (
                            <span className="text-sm font-semibold leading-5">
                              {FormatCurrency(
                                totalPrices && totalPrices?.total_item
                                  ? (totalPrices?.total_item || 0) -
                                      (data?.discount_total || 0)
                                  : 0
                              )}
                            </span>
                          )}
                        </span>
                      </div>
                      {/* <div className="flex justify-between">
                      <span className="text-sm leading-5">Thưởng</span>
                      <span className="text-sm font-semibold leading-5 text-[#E59900] flex items-center gap-1">
                        <img
                          src={coin.src}
                          alt="nvb-loyalty"
                          className="size-5"
                        />
                        <span>
                          {isLoading ? (
                            <Skeleton className="w-20 h-5" />
                          ) : (
                            `+ ${data?.loyalty_points || 0} NVB Loyalty`
                          )}
                        </span>
                      </span>
                    </div> */}
                    </div>
                  </div>
                  {/* Promotion & Loyalty */}
                  <div className="border-t px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Checkbox />
                      <Label className="text-sm text-gray-700">Tất cả</Label>
                    </div>
                    <div className="flex flex-1 justify-end items-end gap-3">
                      <div className="flex flex-col justify-end items-end cursor-pointer">
                        <p className="text-xl text-right text-primary font-semibold flex items-center gap-1">
                          {FormatCurrency(
                            totalPrices && totalPrices?.total_item
                              ? (totalPrices?.total_item || 0) -
                                  (data?.discount_total || 0)
                              : 0
                          )}
                        </p>
                        {/* <p className="text-sm flex items-center gap-1">
                        <span>Thưởng</span>
                        <span className="flex items-center gap-1">
                          <img src={coin.src} className="size-4" />
                          <span className="text-[#E59900] font-semibold">
                            +1.350
                          </span>
                        </span>
                      </p> */}
                      </div>
                      <Button
                        onClick={handleConfirmOrder}
                        disabled={activeItems?.length === 0 || isLoading}
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
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button
              onClick={handleConfirmOrder}
              disabled={activeItems?.length === 0 || isLoading}
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
        </div>
      </div>
    </div>
  );
};

export default DetailOrderMobile;
