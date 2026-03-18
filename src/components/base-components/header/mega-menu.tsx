"use client";
import {Icon} from "@/components/common-components";
import {MegaMenu as MegaMenuComp} from "@/components/particals";
import {Button} from "@/components/ui/button";
import {useWindowSize} from "@/hooks";
import useScroll from "@/hooks/use-scoll";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setSearchKeyword, setShowSearch} from "@/stores/search-slice";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Bounded from "../containers/bounded";
import SearchInput from "../input/search-input";
import AddressDialog from "./address";
import Cart from "./carts";
import UserButton from "./user-button";
import {usePathname} from "next/navigation";

interface MegaMenuProps {
  withSearchScroll?: boolean;
}
const MegaMenu = ({withSearchScroll = false}: MegaMenuProps) => {
  // const pathname = usePathname();

  const isScrolled = useScroll(50, 57);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const {searchKeyword} = useSelector((state: RootState) => state.search);
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();

  // Ref for MegaMenu container
  const megaMenuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLDivElement | null>(null);

  // Close MegaMenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setShowMegaMenu(false);
      }
    };

    if (showMegaMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMegaMenu]);

  const toggleMegaMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMegaMenu((prev) => !prev);
  };

  return (
    <div>
      <Bounded
        className={cn(
          "h-[3rem] desktop:h-[4rem] w-full py-3 flex items-center gap-4 justify-between"
        )}
      >
        {/* DESKTOP */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <div
              ref={toggleButtonRef}
              className="rounded-full bg-transparent desktop:bg-gray-primary gap-2 transition-all duration-500 size-10 desktop:size-auto desktop:px-4 desktop:py-2 flex justify-center items-center cursor-pointer"
              onClick={toggleMegaMenu}
            >
              <Icon icon="heroicons:bars-3-center-left-solid" fontSize={24} />
              <span className="hidden desktop:block text-sm font-semibold">
                Danh mục
              </span>
            </div>

            {/* MEGA MENU */}
            <div
              className={cn(
                " z-50 top-[2.25rem] flex-col left-0 bg-black/40 flex items-center justify-start h-screen w-screen desktop:pt-4 desktop:top-[9rem] ",
                showMegaMenu
                  ? "fixed w-full opacity-100 animate-in fade-in-80 animate-duration-500"
                  : "w-0 h-0 opacity-0 animate-out fade-in-80 animate-duration-500"
              )}
            >
              <div
                className={cn(
                  "min-h-12 flex items-center justify-between px-4 py-[.375rem] w-full bg-txtprimary desktop:hidden",
                  showMegaMenu ? "opacity-100" : "opacity-0"
                )}
              >
                <img src="/icons/nvbplay_logo.svg" alt="" className="h-7" />
                <Icon
                  icon="ph:x"
                  className="text-white cursor-pointer"
                  onClick={() => setShowMegaMenu(false)}
                  fontSize={24}
                />
              </div>
              <div
                ref={megaMenuRef}
                className={cn(
                  "max-w-screen-desktop w-full shadow-xl bg-white  desktop:rounded-2xl rounded-none overflow-hidden ",
                  showMegaMenu
                    ? "p-4 animate-in fade-up-80 animate-duration-500"
                    : "animate-out fade-down-80 animate-duration-500"
                )}
              >
                <MegaMenuComp isShow={showMegaMenu} />
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost">
              <img src="/icons/fire.svg" className="size-5" alt="" />
              <Link
                href="/flashsale"
                className="uppercase bg-gradient-to-b from-orange-700  to-orange-600 bg-clip-text text-transparent font-medium"
              >
                siêu sale
              </Link>
            </Button>
            <Button variant="ghost">
              <p className="uppercase font-medium">Đồ thể thao</p>
            </Button>
          </div>
        </div>

        {/* LOGO */}
        <Link href="/">
          <img
            src="/icons/nvbplay_logo.svg"
            className={cn(
              "w-[75px] h-[28px] lg:w-auto lg:h-auto animate-fade-up ease-in-out duration-500 pointer-events-none",
              {
                "hidden lg:block": isScrolled && withSearchScroll,
              }
            )}
          />
        </Link>

        {/* Search Input - Hide based on scroll */}
        {withSearchScroll && (
          <div
            className={cn(
              "transition-all animate-fade-up duration-500 ease-in-out transform hidden w-full lg:hidden",
              {
                "block lg:hidden": isScrolled,
              }
            )}
          >
            <SearchInput
              value={searchKeyword}
              className="pointer-events-none select-none"
              onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
              placeholder="Tên sản phẩm, hãng"
            />
          </div>
        )}

        {/* DESK */}
        <div className="flex items-center gap-6">
          {/* {pathname.includes("/product/") ? (
            <div className="block desktop:hidden">
              <Cart />
            </div>
          ) : null} */}
          <AddressDialog />
          <div className="hidden lg:block h-8 border-r border-muted-foreground/50" />
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="secondary"
              size="icon"
              className="size-10 rounded-full p-2"
              onClick={() => dispatch(setShowSearch(true))}
            >
              <Icon icon="ph:magnifying-glass" className="size-6" />
            </Button>
            <UserButton />
            <Cart />
          </div>
        </div>
      </Bounded>

      {/* MOBILE SEARCH */}
      {withSearchScroll && (
        <div
          className={cn(
            "px-4 py-2 lg:hidden transition-all animate-fade-down duration-500 ease-in-out",
            {
              hidden: isScrolled,
            }
          )}
        >
          <SearchInput
            className="pointer-events-none select-none"
            onClick={() => dispatch(setShowSearch(true))}
            placeholder="Tên sản phẩm, hãng"
          />
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
