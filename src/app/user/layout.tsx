"use client";
import {toastNVB} from "@/components/base-components/toast";
import {ENUM} from "@/configs";
import {useWindowSize} from "@/hooks";
import {useMediaQuery} from "@/hooks/use-media-query";
import {GlobalLayoutProps} from "@/types";
import {GetACookie} from "@/utilities/cookies";
import {DecryptBasic} from "@/utilities/hash-aes";
import {isTokenValid} from "@/utilities/token";
import {redirect, RedirectType} from "next/navigation";
import React, {FC, useEffect} from "react";

const Layout: FC<GlobalLayoutProps> = ({children}) => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const [width, height] = useWindowSize();
  const token = GetACookie("token");
  useEffect(() => {
    if (!token) {
      redirect("/", RedirectType.push);
    }
    if (!isTokenValid(DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH))) {
      if (isMobile) {
        redirect("/auth", RedirectType.push);
      }
      redirect("/", RedirectType.push);
    }
  });
  if (width < 1200) {
    return children;
  }
  redirect("/profile/personal-info/overview", RedirectType.push);
};

export default Layout;
