"use client";

import { ChevronLeft, Headset } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavigationHeader } from "./sites/mobile-navigation";
import { ProductDetailHeader } from "./sites/product-detail";
import { ProductListHeader } from "./sites/product-list";
import Banner from "./widgets/banner";
import ContainerHeader from "./widgets/container-header";
import MegaMenu from "./widgets/mega-menu";
import Navigation from "./widgets/navigation";
import { DesktopHeader } from "./widgets/desktop-header";
import { CartHeader } from "./sites/cart-header";

const SiteHeader = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <ContainerHeader>
        <div className="flex flex-col w-full">
          <Banner />
          <Navigation />
          <MegaMenu withSearchScroll={true} />
        </div>
      </ContainerHeader>
    );
  }

  if (pathname.includes("/products/")) {
    return (
      <ContainerHeader>
        <ProductDetailHeader />
      </ContainerHeader>
    );
  }

  if (pathname == "/products") {
    return (
      <ContainerHeader>
        <ProductListHeader />
      </ContainerHeader>
    );
  }

  if (pathname.includes("/checkout/result/")) {
    return (
      <ContainerHeader>
        <MobileNavigationHeader />
      </ContainerHeader>
    );
  }

  if (pathname.includes("/profile/address")) {
    return (
      <ContainerHeader>
        <MobileNavigationHeader
          leftIcon={
            <Link href="/profile">
              <ChevronLeft className="size-5" />
            </Link>
          }
          childrenCenter={
            <div className="text-base font-semibold text-neutral-900 -ml-3">
              Tài khoản
            </div>
          }
          rightIcon={<div />}
        />
      </ContainerHeader>
    );
  }

  if (pathname == "/auth") {
    return (
      <ContainerHeader>
        <MobileNavigationHeader
          leftIcon={
            <Link href="/profile">
              <ChevronLeft className="size-5" />
            </Link>
          }
          rightIcon={<Headset className="size-5" />}
        />
      </ContainerHeader>
    );
  }

  if (pathname.includes("/profile")) {
    return (
      <ContainerHeader>
        <MobileNavigationHeader
          leftIcon={
            <Link href="/user">
              <ChevronLeft className="size-5" />
            </Link>
          }
          childrenCenter={
            <div className="text-base font-semibold text-neutral-900">
              Thông tin tài khoản
            </div>
          }
          rightIcon={<div />}
        />
      </ContainerHeader>
    );
  }

  if (pathname.includes("/cart")) {
    return (
      <ContainerHeader>
        <CartHeader />
      </ContainerHeader>
    );
  }

  return <DesktopHeader />;
};

export default SiteHeader;
