"use client";

import {ThemeProvider} from "@/providers";
import {RootState} from "@/stores";
import {GlobalLayoutProps} from "@/types";
import React, {FC} from "react";
import {useSelector} from "react-redux";

const BuilderLayout: FC<GlobalLayoutProps> = ({children}) => {
  const {overlay} = useSelector((state: RootState) => state.theme);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  );
};

export default BuilderLayout;
