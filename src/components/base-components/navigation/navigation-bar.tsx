"use client";
import {COMMON_DATA} from "@/configs";
import {cn} from "@/lib/utils";
import {Icon} from "@iconify/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
const NavigationBar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 bg-white inset-x-0 h-[58px] w-full flex justify-center lg:hidden items-center gap-0 z-30">
      {COMMON_DATA.header.navigation_bar.map((item, index) => (
        <Link
          href={item.link}
          id={item.link === "/cart" ? "cart-button" : undefined}
          key={index}
          className={cn(
            "flex flex-col gap-1.5 items-center justify-center text-center px-3 py-1.5 text-[#808089] hover:text-primary transition-colors duration-300 cursor-pointer",
            {
              "text-primary": pathname === item.link,
            }
          )}
        >
          <Icon icon={item.icon} className="size-6" />
          <span className="text-[11px] leading-4">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
