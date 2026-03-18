import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, SquarePen, Ticket } from "lucide-react";
import React, { useEffect, useState } from "react";
import CartItem from "./cart-item";
import IconCustom from "@/components/common-components/icon-custom";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import { removeCartItem } from "@/services/cart";
import Image from "@/components/base-components/images/image";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  removeItemsActive,
  setCartAvailability,
  setCartData,
  setCartDisable,
  setCartEnable,
  setItemsActive,
  updateItemQuantity,
} from "@/stores/datas/cart-slice";
import Link from "next/link";
import "react-swipeable-list/dist/styles.css";
import { RootState } from "@/stores";
import { useCarts } from "@/hooks/queries/cart";
import Ably from "ably";
import { ToastDismiss, toastNVB } from "@/components/base-components/toast";
import { getAblyChannel } from "@/utilities/ably";
import { OutOfStockEvent } from "@/utilities/ably/type";
const ProductCartListing = () => {
  const dispatch = useDispatch();
  const { removeProduct } = useCarts();
  const { cart, itemsActive } = useSelector(
    (state: RootState) => state.cart_slice
  );
  const handleRemoveCartItem = async (cartId: string, itemId: string) => {
    const res: any = await removeProduct.removeProductMutationAsync({
      cartId,
      lineItemId: itemId,
    });
    if (res) {
      dispatch(removeItem({ lineItemId: itemId }));
      dispatch(removeItemsActive());
    }
  };

  useEffect(() => {
    const channel = getAblyChannel("product_outofstock:cart");
    channel.subscribe("product:outofstock", async (message) => {
      console.log("🚀 ~ channel.subscribe ~ message:", message);
      const productOutofStock: OutOfStockEvent = JSON.parse(message.data);

      productOutofStock.data.forEach(async (item) => {
        if (item.availability <= 0) {
          dispatch(setCartDisable({ variantId: item.id }));
          const lineItemId = cart?.items?.find(
            (item: any) => item?.variant_id === item.id
          )?.id;
          if (lineItemId) {
            await removeProduct.removeProductMutationAsync({
              cartId: cart?.id || "",
              lineItemId: lineItemId || "",
            });
            ToastDismiss();
            toastNVB({
              msg: "Giỏ hàng đã được cập nhật!",
              type: "info",
            });
          }
        } else {
          dispatch(
            setCartAvailability({
              variantId: item.id,
              availability: item.availability,
            })
          );
          dispatch(setCartEnable({ variantId: item.id }));
        }
      });
    });
  }, []);
  const trailingActions = (cartId: string, itemId: string) => (
    <TrailingActions>
      <SwipeAction onClick={() => handleRemoveCartItem(cartId, itemId)}>
        <div className="flex bg-red-500 text-white items-center justify-center px-4">
          <div className="flex flex-col gap-2 justify-center items-center">
            <IconCustom icon="tabler:trash" className="size-5" />
            <span>Xóa</span>
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="flex flex-col rounded-lg bg-white">
      {/* TOP */}
      <div className="flex p-4 items-center gap-3">
        <Checkbox
          checked={itemsActive && itemsActive.length > 0}
          className="size-5 rounded border-gray-200 bg-gray-100 data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800"
          onCheckedChange={(checked) => {
            if (checked) {
              dispatch(
                setItemsActive(
                  cart?.items
                    .filter((item: any) => !item?.disable)
                    .map((item: any) => item?.id)
                )
              );
            } else {
              dispatch(removeItemsActive());
            }
          }}
        />
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-1 group cursor-pointer">
            <p className="text-sm font-medium leading-5 group-hover:text-primary transition-colors duration-300">
              NVB Play
            </p>
            <ChevronRight className="size-4 text-gray-500 group-hover:text-primary transition-colors duration-300" />
          </div>
          {/* <div className="flex items-center gap-1 group cursor-pointer">
            <SquarePen className="size-4 text-gray-500 group-hover:text-primary transition-colors duration-300" />
            <p className="text-sm font-medium leading-5 group-hover:text-primary transition-colors duration-300">
              Chỉnh sửa
            </p>
          </div> */}
        </div>
      </div>
      {/* CTA */}
      <div className="flex py-2.5 px-4 items-center gap-3 bg-gradient-to-r from-[#FFD9D1] to-[#FCEAD9]">
        <div className="flex flex-1 items-center gap-1 desktop:gap-3">
          <Image
            src="/fire_percentage.svg"
            alt="fire_percentage"
            className="size-4 desktop:size-6 object-contain"
          />
          <div className="text-sm">Nhận thêm nhiều ưu đãi hơn</div>
          {/* <div className="hidden desktop:flex items-center gap-1">
            <span className="text-sm leading-5">Mua thêm</span>
            <span className="text-sm font-medium leading-5">100.000đ</span>
            <span className="text-sm leading-5">để giảm thêm</span>
            <span className="text-sm font-medium leading-5">150.000đ</span>
          </div>
          <span className="block desktop:hidden text-[11px] leading-4">
            Mua thêm <b> 100.000 đ</b> để giảm thêm <b> 150.000 đ</b>
          </span> */}
        </div>
        <Link
          href="/products"
          className="flex items-center gap-0 default:gap-1 group cursor-pointer text-primary"
        >
          <p className="text-[11px] desktop:text-sm font-medium leading-5 transition-all group-hover:text-primary/80 duration-300 group-hover:underline">
            Mua thêm
          </p>
          <ChevronRight className="size-4" />
        </Link>
      </div>
      {/* PRODUCTS */}
      <div className="flex flex-col">
        <div className="hidden desktop:block">
          {cart?.items.map((item: any, index: number) => (
            <CartItem
              cartId={cart?.id}
              isOutOfStock={item?.disable}
              key={index}
              item={item}
            />
          ))}
        </div>
        <div className="block desktop:hidden">
          <SwipeableList type={ListType.IOS} threshold={0.3}>
            {cart?.items.map((item: any, index: number) => (
              <SwipeableListItem
                key={index}
                threshold={0.3}
                maxSwipe={0.3}
                trailingActions={trailingActions(cart?.id, item?.id)}
              >
                <CartItem
                  cartId={cart?.id}
                  isOutOfStock={item?.disable}
                  item={item}
                />
              </SwipeableListItem>
            ))}
          </SwipeableList>
        </div>
      </div>
      {/* PROMOTION */}
      {/* <div className="flex items-center py-3 px-4 gap-3">
        <Ticket className="size-6 text-blue-800" />
        <div className="text-sm leading-5 flex flex-1 justify-between desktop:justify-start items-center gap-1.5">
          Mã giảm giá lên đến 200.000 đ
          <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline">
            <span className="hidden desktop:inline-flex">Xem chi tiết</span>
            <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center">
              <ChevronRight className="size-4 ml-0.5" />
            </div>
          </div>
        </div>
      </div> */}
      {/* PROMOTION */}
      {/* <div className="flex items-center py-3 px-4 gap-3">
        <IconCustom
          icon="hugeicons:delivery-truck-02"
          className="size-6 text-green-800"
        />

        <div className="text-sm leading-5 flex flex-1 justify-between desktop:justify-start items-center gap-1.5">
          Miễn phí vận chuyển cho đơn hàng từ 200.000 đ
          <div className="flex  items-center gap-2 text-blue-600 cursor-pointer hover:underline">
            <span className="hidden desktop:inline-flex">Xem chi tiết</span>
            <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center">
              <ChevronRight className="size-4 ml-0.5" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProductCartListing;
