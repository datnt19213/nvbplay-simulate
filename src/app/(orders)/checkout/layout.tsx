import {Header, NavigationBar} from "@/components/base-components";
import React, {FC, ReactNode} from "react";

type LayoutProps = {
  children: ReactNode;
};
const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <>
      {/* <Header /> */}
      {children}
      <NavigationBar />
    </>
  );
};

export default Layout;
