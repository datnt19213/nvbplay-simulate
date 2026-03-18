"use client";
import {BuilderSidebar} from "@/components/particals";
import {useWindowSize} from "@/hooks";
import {useMediaQuery} from "@/hooks/use-media-query";
import BuilderPageLayout from "@/layouts/page-layouts/builder-page-layout";
import {cn} from "@/lib/utils";
import {GlobalLayoutProps} from "@/types";
import {usePathname} from "next/navigation";
import React, {FC} from "react";

const Layout: FC<GlobalLayoutProps> = ({children}) => {
  const pathName = usePathname();
  return (
    <div
      className={cn(
        "flex w-full max-w-[120rem] mx-auto",
        (pathName.includes("/builder/collection") ||
          pathName.includes("/builder/pro-suggest") ||
          pathName.includes("/builder/store-suggest")) &&
          "max-w-[1360px]"
      )}
    >
      <BuilderSidebar />
      <BuilderPageLayout>{children}</BuilderPageLayout>
    </div>
  );
};

export default Layout;
