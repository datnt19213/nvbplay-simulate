"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/services/blog/category/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavigationItem = ({
  nav,
  showAll = false,
}: {
  nav: Category | null;
  showAll: boolean;
}) => {
  const pathname = usePathname();

  return (
    <>
      {showAll && (
        <Link
          href="/blog"
          className={cn(
            "text-base text-[#64646D] text-nowrap capitalize font-semibold hover:text-black hover:border-b-2 border-b-2 border-transparent hover:border-[#FF3F1A] cursor-pointer transition-all duration-200",
            pathname === `/blog` &&
              "border-b-2 border-[#FF3F1A] text-black text-base"
          )}
        >
          Tất cả tin
        </Link>
      )}

      {nav && (
        <Link
          href={`/blog/category/${nav.slug}`}
          key={nav.slug}
          className={cn(
            "text-base text-[#64646D] text-nowrap capitalize font-semibold hover:text-black hover:border-b-2 border-b-2 border-transparent hover:border-[#FF3F1A] cursor-pointer transition-all duration-200",
            pathname === `/blog/category/${nav.slug}` &&
              "border-b-2 border-[#FF3F1A] text-black text-base"
          )}
        >
          {nav?.name?.toLocaleLowerCase() || ""}
        </Link>
      )}
    </>
  );
};
