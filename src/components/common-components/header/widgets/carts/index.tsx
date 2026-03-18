import { NotRecord } from "@/assets/images";
import Image from "@/components/base-components/images/image";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createCart, getCartData } from "@/services/cart";
import { RootState } from "@/stores";
import { setCartData } from "@/stores/datas/cart-slice";
import { FormatCurrency } from "@/utilities/text";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCart from "./product-cart";

type CartProps = {
  popoverTriggerChildren?: React.ReactNode;
  popoverTriggerClassName?: string;
  popoverTriggerSize?:
    | "default"
    | "sm"
    | "lg"
    | "icon"
    | "extra"
    | null
    | undefined;
  popoverTriggerVariant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "blueOutline"
    | "bluePrimary"
    | "grayPrimary"
    | null
    | undefined;
  popoverTriggerCartNumberClassName?: string;
};

const Cart = (props: CartProps) => {
  const {
    popoverTriggerChildren,
    popoverTriggerClassName,
    popoverTriggerSize = "icon",
    popoverTriggerVariant = "secondary",
    popoverTriggerCartNumberClassName,
  } = props;

  const cartData = useSelector((state: RootState) => state.cart_slice.cart);
  const { user } = useSelector((state: RootState) => state.users_data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || cartData) return; // Early return if no user or cart data already exists

    const fetchCartData = async () => {
      try {
        const cartId = localStorage.getItem("cart_id");

        if (cartId) {
          // Fetch existing cart if cartId exists
          const data = await getCartData();
          if (data?.cart) {
            // Valid cart exists
            dispatch(setCartData(data.cart));
            return;
          }
        }

        // Invalid or no cart found, create a new one
        await createNewCart();
      } catch (error) {
        console.error("Error fetching cart:", error);
        await createNewCart();
      }
    };

    const createNewCart = async () => {
      try {
        if (!user?.email) {
          return;
        }

        const res: any = await createCart(user.email);
        if (res?.cart) {
          dispatch(setCartData(res.cart));
          localStorage.setItem("cart_id", res.cart.id);
        }
      } catch (error) {
        console.error("Error creating new cart:", error);
      }
    };

    fetchCartData();
  }, [user, cartData, dispatch]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={popoverTriggerVariant}
          size={popoverTriggerSize}
          className={cn(
            "size-10 rounded-full p-2 relative animate-flip-down",
            popoverTriggerClassName
          )}
          id="cart-button"
        >
          {popoverTriggerChildren ? (
            popoverTriggerChildren
          ) : (
            <IconCustom icon="ph:shopping-cart-fill" className="size-6" />
          )}
          {cartData?.items && cartData?.items?.length > 0 && (
            <p
              className={cn(
                "p-2 pt-1.5 size-[1.125rem] rounded-full text-white bg-red-500 absolute -top-1 -right-1 flex items-center justify-center text-[.625rem]",
                popoverTriggerCartNumberClassName
              )}
            >
              {cartData?.items?.length || 0}
            </p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={20}
        className="w-[400px] h-[400px] p-0 rounded-2xl overflow-hidden flex flex-col"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 pt-4 pb-1">
            <div className="flex justify-between items-center">
              <p className="text-[14px] leading-[21px] font-medium">Giỏ hàng</p>
              {cartData?.items && cartData?.items?.length > 0 && (
                <Link
                  href="/cart"
                  className="text-[14px] leading-[21px] font-medium text-primary hover:underline transition-all duration-200"
                >
                  Xem tất cả
                </Link>
              )}
            </div>
          </div>

          {/* Scrollable product list */}
          {cartData && cartData.items.length > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 px-4">
                <div className="divide-y">
                  {cartData?.items?.map((item: any, index: number) => (
                    <div key={index} className="py-4">
                      <ProductCart cartId={cartData.id} item={item} />
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER */}
              <div className="p-4 border-t border-dashed">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 items-center">
                    <p className="text-[14px] leading-[21px]">Tạm tính </p>
                    <p className="text-[14px] leading-[21px]">
                      ({cartData?.items.length} sản phẩm)
                    </p>
                  </div>
                  <p className="text-lg font-semibold leading-[21px]">
                    {FormatCurrency(cartData?.total)}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center h-full p-4 pb-8">
              <Image src={NotRecord.src} alt="Not Record" />
              <p className="text-sm text-center px-4">
                Không có sản phẩm nào trong giỏ hàng. Hãy tiếp tục mua sắm nhé!
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
