"use client";

import { Icon } from "@/components/common-components";
import { cn } from "@/lib/utils";
import {
  setSearchKeyword,
  setShowSearch,
  setShowSearchSite,
} from "@/stores/search-slice";
import Cookies from "js-cookie";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "usehooks-ts";

export type HistorySearchType = {
  type: "product" | "keyword";
  keyword: string;
  slug?: string;
};

type HistorySearchProps = {
  className?: string;
};

const HistorySearch = ({ className }: HistorySearchProps) => {
  const router = useRouter();

  // Redux
  const dispatch = useDispatch();

  // State
  const [showMore, setShowMore] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Hooks
  const [historySearch, setHistorySearch] = useLocalStorage<
    HistorySearchType[]
  >("historySearch", []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Logic
  const handleDeleteHistorySearch = (searchKeyword: string) => {
    const newHistorySearch = historySearch?.filter(
      (item: HistorySearchType) => item?.keyword !== searchKeyword
    );
    setHistorySearch(newHistorySearch as HistorySearchType[]);
  };

  const handleDeleteAllHistorySearch = () => {
    setHistorySearch([]);
  };

  const handleClickHistorySearch = (searchHistory: HistorySearchType) => {
    dispatch(setShowSearch(false));
    dispatch(setShowSearchSite(false));

    dispatch(setSearchKeyword(searchHistory?.keyword));

    if (searchHistory?.type === "product") {
      router.push(`/products/${searchHistory.slug}`);
    } else {
      Cookies.set("searchProduct", searchHistory.keyword, { expires: 365 });
      router.push(`/products`);
    }
  };

  const displayedHistory = showMore ? historySearch : historySearch?.slice(-5);

  if (!isClient) {
    return (
      <div className={cn("px-4", className)}>
        <p className="text-sm text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className={cn("px-4", className)}>
      <div className="flex flex-col w-full gap-3">
        <div className="w-full flex justify-between items-center">
          <span className="text-primary font-semibold">Lịch sử tìm kiếm</span>
          <span
            className="font-semibold text-red-primary text-sm cursor-pointer"
            onClick={handleDeleteAllHistorySearch}
          >
            Xoá tất cà
          </span>
        </div>
        {!displayedHistory || displayedHistory?.length === 0 ? (
          <div className="flex flex-col justify-between items-center min-h-6 gap-2">
            <History className="size-5 text-gray-icon" />
            <p className="text-sm text-gray-500">
              Không tìm thấy lịch sử tìm kiếm nào
            </p>
          </div>
        ) : (
          <>
            {displayedHistory
              ?.slice(0, displayedHistory.length)
              ?.reverse()
              ?.map((searchHistory, index) => (
                <SearchHistoryItem
                  key={index}
                  name={searchHistory?.keyword || ""}
                  deleteHistory={handleDeleteHistorySearch}
                  onClick={() => handleClickHistorySearch(searchHistory)}
                />
              ))}

            {historySearch && historySearch?.length > 5 && (
              <span
                className="text-txtfourth text-sm font-semibold cursor-pointer mx-auto"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Thu gọn" : "Xem thêm"}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HistorySearch;

type SearchHistoryItemProps = {
  name: string;
  deleteHistory: (searchKeyword: string) => void;
  onClick: () => void;
};
const SearchHistoryItem: FC<SearchHistoryItemProps> = ({
  name,
  deleteHistory,
  onClick,
}) => {
  return (
    <div className="flex items-center min-h-6 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
      <div className="flex items-center gap-[15px] flex-1" onClick={onClick}>
        <Icon
          icon="ph:clock-clockwise"
          className="rotate-90 text-gray-icon"
          fontSize={20}
        />
        <span className="text-sm flex-grow">{name}</span>
      </div>
      <Icon
        icon="ph:x"
        fontSize={24}
        className="size-6 text-gray-icon cursor-pointer"
        onClick={() => deleteHistory(name)}
      />
    </div>
  );
};
