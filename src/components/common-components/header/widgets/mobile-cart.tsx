"use client";

import { RootState } from "@/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export const HeaderCartIcon = () => {
  return (
    <Image
      src="/icons/product-detail/sp-cart.svg"
      width={24}
      height={24}
      alt=""
      className="animate-flip-down mr-1"
    />
  );
};

export const MobileCart = () => {
  // Redux
  const cartData = useSelector((state: RootState) => state.cart_slice.cart);

  return (
    <Link href="/cart">
      <div
        className={"size-10 rounded-full p-2 relative animate-flip-down"}
        id="cart-button"
      >
        <HeaderCartIcon />
        {cartData?.items && cartData?.items?.length > 0 && (
          <p
            className={
              "p-2 pt-1.5 size-[1.125rem] rounded-full text-white bg-red-500 absolute top-1 right-1 flex items-center justify-center text-[.625rem]"
            }
          >
            {cartData?.items?.length || 0}
          </p>
        )}
      </div>
    </Link>
  );
};
