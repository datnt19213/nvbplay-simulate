"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronLeft, Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Banner from "../widgets/banner";
import { DesktopHeader } from "../widgets/desktop-header";
import { MobileCart } from "../widgets/mobile-cart";
import { Button } from "@/components/ui/button";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";

export const HeaderShareIcon = () => {
  return (
    <Image
      src="/icons/product-detail/share-icon.svg"
      width={24}
      height={24}
      alt=""
      className="animate-flip-down mr-1"
    />
  );
};

export const CartHeader = () => {
  // Hooks
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const cartData = useSelector((state: RootState) => state.cart_slice.cart);

  // Render
  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <Banner />
        <div className="flex justify-between items-center px-5 py-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="size-5 text-neutral-800 -ml-1" />
          </Button>
          <h3 className="text-base font-semibold text-neutral-900 space-x-1">
            <span>Giỏ hàng</span>
            {cartData?.items && cartData?.items?.length > 0 && (
              <span className="text-sm text-neutral-500">
                ({cartData?.items?.length})
              </span>
            )}
          </h3>
          <div className="size-10" />
        </div>
      </div>
    );
  }

  return <DesktopHeader />;
};
