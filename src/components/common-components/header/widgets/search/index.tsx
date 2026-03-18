"use client";
import SearchInput from "@/components/base-components/input/search-input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import useGetSearchProducts from "@/hooks/queries/products/useGetSearchProducts";
import { Product } from "@/services/products/type";
import { RootState } from "@/stores";
import { setSearchKeyword, setShowSearchSite } from "@/stores/search-slice";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";
import Banner from "../banner";
import CategoryCarousel from "./category";
import HistorySearch, { HistorySearchType } from "./history";
import ProductItems from "./product-item";
import TrendingSearch from "./trending";
import { useEffect, useState } from "react";

const SearchSiteContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const showSearchSite = useSelector(
    (state: RootState) => state.search.showSearchSite
  );
  const { searchKeyword } = useSelector((state: RootState) => state.search);
  const [searchValue, setSearchValue] = useState(searchKeyword);
  const [debouncedValue, setValue] = useDebounceValue(searchValue, 500);
  const [historySearch, setHistorySearch] = useLocalStorage<
    HistorySearchType[]
  >("historySearch", []);

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
    dispatch(setSearchKeyword(debouncedValue));
  }, [debouncedValue]);

  const handleStoreProductToHistorySearch = (product: Product) => {
    if (product?.title == "") return;

    const isDuplicate = historySearch?.some(
      (history) => history.keyword === product?.title
    );

    if (isDuplicate) return;

    const newHistorySearch = [
      ...historySearch,
      {
        type: "product",
        keyword: product?.title,
        slug: product?.handle,
      },
    ];
    setHistorySearch(newHistorySearch as HistorySearchType[]);
  };

  const handleClose = () => {
    dispatch(setShowSearchSite(false));
  };
  const { data: productsList, isLoading } = useGetSearchProducts();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchKeyword(searchKeyword));
    handleStoreSearchKeyword(searchKeyword);
    dispatch(setShowSearchSite(false));
    Cookies.set("searchProduct", searchKeyword, { expires: 365 });
    router.push(`/products`);
  };

  return (
    <Sheet open={showSearchSite} onOpenChange={handleClose}>
      <SheetContent withCloseButton={false} className="w-full h-screen !p-0">
        <div className="flex flex-col h-full">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <div className="flex flex-col h-full">
            <Banner className="h-[45px]" />
            <div className="flex items-center gap-1 py-2 px-4">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="p-0">
                  <ChevronLeft className="size-6 text-gray-600" />
                </Button>
              </SheetClose>
              <div className="flex-1">
                <SearchInput
                  iconRight
                  placeholder="Tên sản phẩm, hãng"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSubmit={(e: any) => {
                    onSubmit(e);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 py-4 overflow-y-auto">
              {searchKeyword ? (
                <>
                  {isLoading ? (
                    <Skeleton className="w-full h-full" />
                  ) : (
                    <>
                      {productsList?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {productsList?.map((product: Product) => (
                            <ProductItems
                              key={product.id}
                              {...product}
                              onClick={() => {
                                handleClose();
                                handleStoreProductToHistorySearch(product);
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-center items-center h-full">
                            <p className="text-sm text-gray-500">
                              Không tìm thấy sản phẩm nào
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <HistorySearch />
                  <div className="mt-5">
                    <TrendingSearch />
                  </div>
                  <CategoryCarousel />
                </>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSiteContainer;
