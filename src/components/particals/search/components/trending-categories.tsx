import React, { useMemo } from "react";
import { CardTrendCategory } from "../elements";
import useGetCategoriesQuery from "@/hooks/queries/categories/useGetCategoriesQuery";
import { FilterOption, setShowSearch } from "@/stores/search-slice";
import useSearchFilter from "@/hooks/useSearchFilter";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const TrendingCategories = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCategoriesQuery();
  const { dispatchItem, handleSelect, selectedItems } =
    useSearchFilter("selectedCategories");

  const onChange = (item: FilterOption) => {
    handleSelect(item);
    dispatchItem(item);
    dispatch(setShowSearch(false));
    router.push(`/products`);
  };

  function buildTree(categories: any) {
    const idToNodeMap = new Map();
    const tree: any[] = [];

    // Đầu tiên, ánh xạ từng danh mục bằng ID
    categories.forEach((category: any) => {
      idToNodeMap.set(category.id, { ...category, children: [] });
    });

    // Xây dựng cây bằng cách gắn danh mục con vào danh mục cha
    categories.forEach((category: any) => {
      const parentId = category.parent_category_id;
      const currentNode = idToNodeMap.get(category.id);

      if (parentId) {
        const parentNode = idToNodeMap.get(parentId);
        if (parentNode) {
          parentNode.children.push(currentNode);
        }
      } else {
        // Nếu không có cha, thêm vào gốc của cây
        tree.push(currentNode);
      }
    });

    return tree;
  }

  const categories = useMemo(() => {
    return buildTree(data);
  }, [data]);

  if (isLoading || !categories)
    return <Skeleton className="h-[10rem] w-full" />;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-primary font-semibold">Danh mục nổi bật</span>

      <Carousel>
        <CarouselContent>
          {categories?.map((category, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 select-none"
            >
              <CardTrendCategory
                image={
                  category?.metadata?.thumbnail
                    ? category?.metadata?.thumbnail
                    : undefined
                }
                title={category.name}
                onClick={() =>
                  onChange({ label: category.name, value: category.handle })
                }
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TrendingCategories;
