"use client";
import {Icon} from "@/components/common-components";
import {COMMON_DATA} from "@/configs";
import {cn} from "@/lib/utils";
import {setSidebarSelected} from "@/stores/profile";
import {GlobalLayoutProps} from "@/types";
import {translate} from "@/utilities/translator";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {FC, useEffect} from "react";
import {useDispatch} from "react-redux";

const Layout: FC<GlobalLayoutProps> = ({children}) => {
  const pathName = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebarSelected(pathName));
  }, [pathName]);
  return (
    <div className="flex w-full flex-col gap-3 p-2">
      <div className="flex flex-col gap-3 bg-white rounded-t-lg pt-4 animate-fade-up">
        <p className=" h-10 flex items-center px-4 w-full text-lg font-semibold">
          {translate("account")}
        </p>
        <div className="flex w-full items-center overflow-x-scroll overflow-y-hidden scrollbar-none">
          <div className="flex items-center">
            {COMMON_DATA.profile_tabs.map((item, index) => (
              <TabItemProfile
                key={index}
                title={item.name}
                icon={item.icon}
                url={item.url}
                active={pathName === item.url}
              />
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;

type TabItemProfileProps = {
  title: any;
  icon?: string;
  active?: boolean;
  url?: string;
};
const TabItemProfile: FC<TabItemProfileProps> = ({
  title,
  active,
  icon,
  url,
}) => {
  return (
    <Link
      href={`${url}`}
      className={cn(
        "h-12 min-w-[160px] border-b-2 border-transparent justify-center transition-all duration-200 flex items-center gap-2 cursor-pointer",
        active && "border-b-txtthird"
      )}
    >
      <Icon
        icon={`${icon}`}
        fontSize={24}
        color={active ? "#FF3F1A" : "#515158"}
      />
      <span
        className={cn(
          "text-nowrap text-sm font-semibold",
          active && "text-txtthird"
        )}
      >
        {translate(title)}
      </span>
    </Link>
  );
};
