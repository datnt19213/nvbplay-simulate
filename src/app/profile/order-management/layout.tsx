import React, {FC, ReactNode} from "react";
import {children} from "solid-js";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({children}) => {
  return <>{children}</>;
};

export default Layout;
