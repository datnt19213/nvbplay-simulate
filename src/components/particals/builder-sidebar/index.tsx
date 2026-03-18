"use client";
import {Collection, ProSuggest, Shirt, StoreSuggest} from "@/assets/icons";
import {Logo} from "@/assets/images";
import {Button} from "@/components/ui/button";
import {COMMON_DATA} from "@/configs";
import {cn} from "@/lib/utils";
import {usePathname, useRouter} from "next/navigation";
import React, {FC, useEffect, useState} from "react";

const BuilderSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [currentPath, setCurrentPath] = useState<any>();

  useEffect(() => {
    setCurrentPath(pathName);
  }, [pathName]);

  return (
    <div className="min-w-20 max-w-20 min-h-screen border-r bg-white border-gray-border hidden desktop:flex flex-col gap-4 pb-5">
      <div className="flex flex-col relative items-center justify-center gap-4 w-full h-[88px]">
        <img
          src={Logo.src}
          alt="logo"
          onClick={() => router.push("/")}
          className="w-[52px] has-[52px] cursor-pointer "
        />
        <hr className="w-10 h-[1px] border-gray-border absolute bottom-0 left-1/2 -translate-x-1/2" />
      </div>
      <div className="flex flex-col gap-4 items-center">
        {COMMON_DATA.sidebar_builder.map((item, index) => (
          <SidebarButton
            key={index}
            icon={item.icon}
            active={currentPath === item.url}
            title={item.title}
            onClick={() => router.push(item.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default BuilderSidebar;

type SidebarButtonProps = {
  icon: "build-new" | "collection" | "store-suggest" | "pro-suggest" | string;
  active?: boolean;
  title: string;
  onClick?: () => void;
};
export const SidebarButton: FC<SidebarButtonProps> = ({
  icon,
  active,
  title,
  onClick,
}) => {
  return (
    <Button
      onClick={() => onClick && onClick()}
      className={cn(
        "bg-white p-0 !h-[52px] !w-[52px] rounded-lg border hover:bg-transparent transition-all relative group",
        active
          ? "bg-gray-primary hover:bg-gray-primary border-blue-primary"
          : "bg-white border-transparent"
      )}
    >
      <div className="absolute z-[20] group-hover:flex left-[125%] w-fit h-[37px]  shadow-sm px-3 bg-white border rounded-lg border-gray-border text-txtfifth hidden items-center justify-center animate-fade-up animate-duration-200">
        <div className="h-1/3 aspect-square bg-white rotate-45 top-1/2 -translate-y-1/2 -left-[7px] border-l border-b border-gray-border absolute"></div>
        {title}
      </div>
      {icon === "build-new" && (
        <img
          src={Shirt.src}
          alt=""
          className="select-none w-[32px] h-[32px] aspect-square relative z-[1]"
        />
      )}
      {icon === "collection" && (
        <img
          src={Collection.src}
          alt=""
          className="select-none w-[32px] h-[32px] aspect-square relative z-[1]"
        />
      )}
      {icon === "store-suggest" && (
        <img
          src={StoreSuggest.src}
          alt=""
          className="select-none w-[32px] h-[32px] aspect-square relative z-[1]"
        />
      )}
      {icon === "pro-suggest" && (
        <img
          src={ProSuggest.src}
          alt=""
          className="select-none w-[32px] h-[32px] aspect-square relative z-[1]"
        />
      )}
    </Button>
  );
};
