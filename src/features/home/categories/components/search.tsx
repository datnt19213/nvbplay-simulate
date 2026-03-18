"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/stores";
import { setSearchKeyword } from "@/stores/search-slice";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const categories = [
  { id: 1, name: "Vợt cầu lông" },
  { id: 2, name: "Áo cầu lông Yonex" },
  { id: 3, name: "Pickleball" },
  { id: 4, name: "Quấn cán vợt" },
  { id: 5, name: "Phụ kiện" },
];

const SearchSection = () => {
  const { searchKeyword } = useSelector((state: RootState) => state.search);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchKeyword(searchKeyword));
    Cookies.set("searchProduct", searchKeyword, { expires: 365 });
    router.push(`/products`);
  };

  return (
    <div className="hidden desktop:flex flex-col items-center gap-5">
      <h2 className="text-[32px] font-bold">Bạn tìm gì hôm nay?</h2>
      <div className="flex flex-col gap-2">
        <form
          onSubmit={handleSearch}
          className="relative flex items-center rounded-full bg-white h-[66px] w-[43.75rem] overflow-hidden ps-5 pe-3"
        >
          <Input
            className="h-full w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 !text-base placeholder:text-base"
            value={searchKeyword}
            onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
            placeholder="Vợt cầu lông Li-ning giá ưu đãi"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="size-14 rounded-full"
          >
            <Search className="size-6 text-foreground" />
          </Button>
        </form>
        <div className="flex items-center gap-4 px-5">
          {categories.map((cate) => (
            <p
              onClick={() => {
                dispatch(setSearchKeyword(cate.name));
                Cookies.set("searchProduct", cate.name, { expires: 365 });
                router.push(`/products`);
              }}
              className="text-sm cursor-pointer text-blue-700 hover:text-primary"
              key={cate.id}
            >
              {cate.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
