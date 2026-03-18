"use client";
import SearchInput from "@/components/base-components/input/search-input";
import { Button } from "@/components/ui/button";
import { useGhostPosts } from "@/hooks/queries/ghost";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/stores";
import { setSearchKeyword, resetSearch } from "@/stores/ghost";
import { cn } from "@/lib/utils";

const SearchAndFilter = () => {
  const { q } = useSelector((state: RootState) => state.ghost);
  const dispatch = useDispatch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeyword(e.target.value));
  };
  const handleClear = () => {
    dispatch(resetSearch());
  };
  return (
    <div className="flex items-center gap-2 mb-4">
      <SearchInput
        onChange={handleSearch}
        value={q}
        placeholder="Tìm kiếm bài viết"
        containerClassName="bg-white px-2 h-11 w-full"
      />
      {q && (
        <Button
          variant="link"
          size="sm"
          className={cn(
            "transition-opacity duration-300 animate-fade-left ease-in-out",
            q ? "opacity-100" : "opacity-0"
          )}
          onClick={handleClear}
        >
          Xóa tìm kiếm
        </Button>
      )}
    </div>
  );
};

export default SearchAndFilter;
