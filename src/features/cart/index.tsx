"use client";
import Bounded from "@/components/base-components/containers/bounded";
import Heading from "@/components/base-components/typography/heading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import ProductCartListing from "./components/product";
import NoRecord from "./components/no-record";
import OrderInfomation from "./components/order-infomation";
import PromotionOrder from "./components/promotion";
import DetailOrderMobile from "./components/detail-mobile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useCarts } from "@/hooks/queries/cart";
import { useProducts } from "@/hooks/queries/products";
import ProductCard from "@/components/base-components/cards/product-card";
import {
  removeItemsActive,
  setCartData,
  setItemsActive,
} from "@/stores/datas/cart-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { GetACookie } from "@/utilities/cookies";
import { useRouter } from "next/navigation";

const CartFeatures = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { cart: cartData, itemsActive } = useSelector(
    (state: RootState) => state.cart_slice
  );
  // const { user } = useSelector((state: RootState) => state.users_data);

  const { cart, isLoading, isSuccess } = useCarts();
  const { products: productData } = useProducts();

  const totalPrices = useMemo(() => {
    const total_item = itemsActive?.reduce((acc, itemId) => {
      const item = cartData?.items?.find((item: any) => item.id === itemId);
      return acc + (item ? item.unit_price * item.quantity : 0);
    }, 0);

    return { total_item };
  }, [itemsActive, cartData]);

  const handleSelectAll = (checked: boolean) => {
    if (cartData && cartData?.items) {
      dispatch(removeItemsActive());
      if (checked) {
        dispatch(
          setItemsActive(
            cartData?.items
              .filter((item: any) => !item?.disable)
              .map((item: any) => item?.id)
          )
        );
      }
    }
  };

  useEffect(() => {
    if (isSuccess && cart) {
      dispatch(setCartData(cart.cart));
      handleSelectAll(true);
    }
  }, [isSuccess, cart, dispatch]);

  useEffect(() => {
    handleSelectAll(true);
  }, [cartData]);

  useEffect(() => {
    const token = GetACookie("token");
    if (!token) {
      router.push("/auth?redirect=/cart");
    }
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full h-[48px] rounded-lg" />;
  }

  return (
    <Bounded className="py-6 flex gap-3 relative w-full">
      <div className="flex flex-col gap-3 flex-1">
        <div className="h-[48px] rounded-lg px-4 py-3 bg-white hidden desktop:flex items-center">
          <div className="flex w-full items-center gap-3">
            <Checkbox
              onCheckedChange={handleSelectAll}
              checked={
                cartData?.items &&
                itemsActive?.length ===
                  cartData?.items?.filter((item: any) => !item?.disable)?.length
              }
              className="size-5 rounded border-gray-200 bg-gray-100 data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800"
            />
            <div className="flex w-full items-center gap-4">
              <div className="flex items-center w-full">
                <p className="w-[304px] text-sm flex flex-1 items-center gap-0.5">
                  <span>Tất cả</span>{" "}
                  <span>({cartData?.items?.length} sản phẩm)</span>
                </p>
                <div className="flex flex-1 items-center text-sm">
                  <p className="w-[142px] text-center">Đơn giá</p>
                  <p className="w-[142px] text-center">Số lượng</p>
                  <p className="w-[142px] text-right">Thành tiền</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0">
                <Trash2Icon className="size-5 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2Icon className="size-5 text-gray-500 animate-spin   " />
          </div>
        ) : cart && cart?.cart && cart?.cart?.items?.length > 0 ? (
          <ProductCartListing />
        ) : (
          <NoRecord />
        )}

        <div
          className={cn("flex flex-col w-full gap-4 bg-white rounded-lg p-4")}
        >
          <div className="flex items-center justify-between">
            <Heading>Có thể bạn sẽ thích</Heading>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 desktop:grid-cols-4 gap-[12.5px]">
            {productData
              ?.slice(0, 4)
              .map((item: any, index: any) => (
                <ProductCard withBoder {...item} key={index} />
              ))}
          </div>
        </div>
      </div>
      <div className="hidden desktop:inline-block w-[360px]">
        <div className="sticky top-[10rem] flex flex-col gap-3">
          <PromotionOrder data={cartData} />
          <OrderInfomation
            data={cartData}
            totalPrices={totalPrices}
            activeItems={itemsActive || []}
          />
        </div>
      </div>
      {cartData && cartData?.items && cartData?.items?.length > 0 && (
        <DetailOrderMobile
          data={cartData}
          totalPrices={totalPrices}
          activeItems={itemsActive || []}
        />
      )}
    </Bounded>
  );
};

export default CartFeatures;
