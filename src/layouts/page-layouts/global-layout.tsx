import {NavigationBar} from "@/components/base-components";
import {GlobalLayoutProps} from "@/types";
import React, {FC} from "react";

export const GlobalLayout: FC<GlobalLayoutProps & {isBottomNav?: boolean}> = ({
  children,
  isBottomNav = true,
}) => {
  return (
    <div className=" w-full h-auto container">
      {children}
      {isBottomNav && <NavigationBar />}
    </div>
  );
};
