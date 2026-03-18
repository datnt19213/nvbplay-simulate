import { HistorySearchType } from "@/components/common-components/header/widgets/search/history";
import { Skeleton } from "@/components/ui/skeleton";
import useGetSearchProducts from "@/hooks/queries/products/useGetSearchProducts";
import { setShowSearch } from "@/stores/search-slice";
import { PackageSearch } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "usehooks-ts";
import { SearchSuggestionItem } from "../elements";

const OnSearchSuggestion = () => {
  const { isFetching, data } = useGetSearchProducts();

  // redux
  const dispatch = useDispatch();

  // Hooks
  const [historySearch, setHistorySearch] = useLocalStorage<
    HistorySearchType[]
  >("historySearch", [
    {
      type: "product",
      keyword: "",
    },
  ]);

  const handleClick = (e: React.MouseEvent) => {
    // e.stopPropagation();
    dispatch(setShowSearch(false));
  };

  const handleStoreProductToHistorySearch = (product: any) => {
    const newHistorySearch = [
      ...historySearch,
      {
        type: "product",
        keyword: product.title,
        slug: product.handle,
      },
    ];
    setHistorySearch(newHistorySearch as never[]);
  };

  return (
    <div className="flex flex-col gap-3">
      {isFetching ? (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-[100px] w-full rounded" />
          ))}
        </>
      ) : (
        <>
          {data?.length == 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <PackageSearch className="size-5 text-gray-icon" />
              <p className="text-sm text-gray-500">
                Không tìm thấy sản phẩm gợi ý nào
              </p>
            </div>
          ) : (
            data?.map((product: any, index: number) => (
              <SearchSuggestionItem
                key={index}
                image={product.thumbnail}
                handle={product.handle}
                title={product.title}
                handleClick={() => {
                  handleStoreProductToHistorySearch(product);
                  handleClick(product);
                }}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default OnSearchSuggestion;
