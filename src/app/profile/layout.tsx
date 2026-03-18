"use client";
import ProfileSidebar from "@/components/particals/profile-sidebar";
import {ENUM} from "@/configs";
import {HomeLayout} from "@/layouts/page-layouts";
import {GetACookie} from "@/utilities/cookies";
import {DecryptBasic} from "@/utilities/hash-aes";
import {isTokenValid} from "@/utilities/token";
import {redirect, usePathname} from "next/navigation";
import React, {FC, ReactNode, useEffect} from "react";

type ProfileLayoutProps = {
  children: ReactNode;
};

const ProfileLayout: FC<ProfileLayoutProps> = ({children}) => {
  const pathName = usePathname();
  useEffect(() => {
    const token = GetACookie("token");
    if (token) {
      const decrypted = DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH);
      if (!isTokenValid(decrypted)) {
        redirect("/auth");
      }
      return;
    }
    redirect("/auth");
  }, []);

  return (
    <HomeLayout>
      <div className="w-full bg-gray-primary min-h-[calc(100dvh-300px)]">
        <div className="max-w-[1440px] w-full py-6 desktop:px-[120px] flex gap-3 items-start mx-auto">
          {!pathName.startsWith("/profile/kyc") && <ProfileSidebar />}
          {children}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ProfileLayout;
