import {
  FlashSaleBanner,
  FlashSaleCountDown,
  FlashSaleTab,
} from "@/features/flashsale";
import {GlobalLayout} from "@/layouts/page-layouts";
import {GlobalLayoutProps} from "@/types";
import React, {FC} from "react";

const Layout: FC<GlobalLayoutProps> = ({children}) => {
  return (
    <div className="max-w-[1440px] w-full mx-auto flex flex-col">
      <FlashSaleBanner />
      <FlashSaleCountDown />
      <FlashSaleTab />
      <GlobalLayout>{children}</GlobalLayout>
    </div>
  );
};

export default Layout;
