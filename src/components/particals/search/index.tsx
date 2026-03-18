"use client";
import SearchInput from "@/components/base-components/input/search-input";
import { Icon } from "@/components/common-components";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { setSearchKeyword, setShowSearch } from "@/stores/search-slice";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OnSearchSuggestion from "./components/on-search-progress";
import TrendingCategories from "./components/trending-categories";
import TrendingsSearch from "./components/trending-search";
import Cookies from "js-cookie";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";
import HistorySearch, {
  HistorySearchType,
} from "@/components/common-components/header/widgets/search/history";

const Search = () => {
  const { showSearch, searchKeyword } = useSelector(
    (state: RootState) => state.search
  );
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(searchKeyword);
  const [debouncedValue] = useDebounceValue(searchValue, 500);

  // Hooks
  const [historySearch, setHistorySearch] = useLocalStorage<
    HistorySearchType[]
  >("historySearch", [
    {
      type: "product",
      keyword: "",
    },
  ]);

  const handleStoreSearchKeyword = (keyword: string) => {
    if (keyword == "") return;

    const isDuplicate = historySearch?.some(
      (history) => history.keyword === keyword
    );

    if (isDuplicate) return;

    const newHistorySearch = [
      ...historySearch,
      {
        type: "keyword",
        keyword,
      },
    ];
    setHistorySearch(newHistorySearch as HistorySearchType[]);
  };

  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showSearch]);

  useEffect(() => {
    dispatch(setSearchKeyword(debouncedValue));
  }, [debouncedValue]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchKeyword(searchKeyword));
    handleStoreSearchKeyword(searchValue);
    dispatch(setShowSearch(false));
    Cookies.set("searchProduct", searchKeyword, { expires: 365 });
    router.push(`/products`);
  };

  return (
    <div hidden={!showSearch}>
      <div
        onClick={() => dispatch(setShowSearch(false))}
        className={cn(
          "fixed z-50 top-[76px] left-0 w-screen h-screen bg-black/40 justify-center items-center animate-fade animate-duration-500 transition-all pointer-events-auto"
        )}
      >
        <div
          className="h-[3rem] desktop:h-[4rem] w-full py-3 px-4 bg-white !max-w-none flex items-center gap-4 mb-1 justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="items-center flex justify-center gap-4 h-full animate-fade duration-500 w-full ">
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                " w-10 h-10 lg:w-12 lg:h-12 aspect-square rounded-full p-2 transition-all flex items-center justify-center !bg-none animate-duration-1000 overflow-hidden lg:hidden min-w-10 lg:min-w-12"
              )}
              onClick={() => dispatch(setShowSearch(false))}
            >
              <Icon icon="ph:caret-left" className="size-6" />
            </Button>
            <SearchInput
              ref={inputRef}
              onSubmit={(e: any) => {
                onSubmit(e);
              }}
              value={searchValue}
              placeholder="TÌM KIẾM"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              containerClassName="!max-w-[640px] !h-10 lg:!h-12 !w-full flex-row-reverse"
              className="!w-full"
            />
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "rounded-full size-10 transition-all animate-duration-1000"
              )}
              onClick={() => dispatch(setShowSearch(false))}
            >
              <Icon icon="ph:x" className="size-6" />
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "justify-center items-start h-full",
            showSearch ? "flex" : "hidden"
          )}
        >
          {(!searchKeyword || searchKeyword.length === 0) && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "bg-white overflow-hidden flex-col flex gap-5 lg:rounded-[20px] shadow-md h-fit max-w-[640px] w-full p-4"
              )}
            >
              {/* <SearchHistory type="wait" /> */}
              <HistorySearch className="!px-0" />
              <div className="flex flex-col gap-5 w-full overflow-x-hidden overflow-y-scroll scrollbar-none">
                <TrendingsSearch />
                <TrendingCategories />
              </div>
            </div>
          )}
          {searchKeyword && searchKeyword.length > 0 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "bg-white overflow-hidden flex-col flex gap-5 lg:rounded-[20px] shadow-md h-full lg:max-h-[623px] max-w-[640px] w-full p-4"
              )}
            >
              {/* <SearchHistory type="onseach" /> */}
              <HistorySearch className="!px-0" />
              <div className="flex flex-col gap-5 w-full overflow-x-hidden overflow-y-scroll scrollbar-none">
                <span className="text-primary font-semibold">
                  Sản phẩm gợi ý
                </span>
                <OnSearchSuggestion />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
