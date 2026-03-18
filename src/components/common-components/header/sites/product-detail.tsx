"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronLeft, Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Banner from "../widgets/banner";
import { DesktopHeader } from "../widgets/desktop-header";
import { MobileCart } from "../widgets/mobile-cart";
import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";
import { toastNVB } from "@/components/base-components/toast";

export const HeaderShareIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Image
      src="/icons/product-detail/share-icon.svg"
      width={24}
      height={24}
      alt=""
      className="animate-flip-down mr-1"
      onClick={onClick && onClick}
    />
  );
};

export const ProductDetailHeader = () => {
  // Hooks
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { copyToClipboard } = useCopyToClipboard();

  const handleShareProduct = () => {
    copyToClipboard(window.location.href);
    toastNVB({
      msg: "Đã sao chép link sản phẩm",
      type: "success",
    });
  };

  // Render
  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <Banner />
        <div className="flex justify-between items-center px-5 py-2">
          {/* Left side */}
          <Link href="/">
            <ChevronLeft className="size-5 text-neutral-800 -ml-1" />
          </Link>
          {/* Right side */}
          <div className="flex items-center gap-4">
            <MobileCart />
            <HeaderShareIcon onClick={handleShareProduct} />
            <Ellipsis className="size-6 animate-flip-down" />
          </div>
        </div>
      </div>
    );
  }

  return <DesktopHeader />;
};
