"use client";

import SearchInput from "@/components/base-components/input/search-input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { setSearchKeyword, setShowSearch } from "@/stores/search-slice";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../widgets/banner";
import { DesktopHeader } from "../widgets/desktop-header";
import { MobileCart } from "../widgets/mobile-cart";
import { RootState } from "@/stores";
import Cookies from "js-cookie";

export const ProductListHeader = () => {
  // Redux
  const { searchKeyword } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  // Hooks
  const isMobile = useMediaQuery("(max-width: 768px)");

  //   Logic
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchKeyword(searchKeyword));
    dispatch(setShowSearch(false));
    Cookies.set("searchProduct", searchKeyword, { expires: 365 });
  };

  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <Banner />
        <div className="flex justify-between items-center px-5 py-2">
          <Link href="/">
            <ChevronLeft className="size-5 text-neutral-800 -ml-1" />
          </Link>
          <div
            className={cn(
              "px-2 py-2 lg:hidden w-full transition-all animate-fade-down duration-500 ease-in-out"
            )}
          >
            <SearchInput
              onSubmit={(e: any) => {
                onSubmit(e);
              }}
              value={searchKeyword}
              placeholder="Tìm kiếm theo tên, hãng"
              onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
              containerClassName="!h-10 lg:!h-12 !w-full flex-row-reverse"
              className="!w-full"
            />
          </div>
          <MobileCart />
        </div>
      </div>
    );
  }

  return <DesktopHeader />;
};
