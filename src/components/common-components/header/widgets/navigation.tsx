"use client";
import React from "react";
import { COMMON_DATA } from "@/configs";
import Link from "next/link";
import { Icon } from "@/components/common-components";
import NovuCenter from "./novu-center";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import Bounded from "@/components/base-components/containers/bounded";

const Navigation = () => {
  const userData = useSelector((state: RootState) => state.users_data.user);
  return (
    <div className="hidden lg:block h-[2.5rem] bg-[#27272A]">
      <Bounded
        as="div"
        className="h-full flex items-center justify-end gap-8 text-xs leading-[1.125rem]"
      >
        {COMMON_DATA.header.navigations.map((navigation, index) => {
          if (navigation.link) {
            return (
              <Link
                href={navigation.link}
                key={index}
                className="flex items-center gap-2 text-white hover:text-primary transition-colors duration-200"
              >
                <Icon icon={navigation.icon} className="size-5" />
                {navigation.name}
              </Link>
            );
          } else {
            return (
              //   <Notification
              //     icon={navigation.icon}
              //     name={navigation.name}
              //     key={index}
              //   />
              <div key={index}>
                {userData && (
                  <NovuCenter
                    icon={navigation.icon}
                    name={navigation.name}
                    key={index}
                  />
                )}
              </div>
            );
          }
        })}
      </Bounded>
    </div>
  );
};

export default Navigation;
