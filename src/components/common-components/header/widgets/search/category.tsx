import Image from "@/components/base-components/images/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import useGetCategoriesQuery from "@/hooks/queries/categories/useGetCategoriesQuery";
import useSearchFilter from "@/hooks/useSearchFilter";
import { FilterOption, setShowSearchSite } from "@/stores/search-slice";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

const CategoryCarousel = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const { dispatchItem, handleSelect, selectedItems } =
    useSearchFilter("selectedCategories");
  const onChange = (item: FilterOption) => {
    handleSelect(item);
    dispatchItem(item);
    dispatch(setShowSearchSite(false));
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center ">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-40 h-64" />
        ))}
      </div>
    );

  if (categories && categories.length > 0) {
    const items = categories.map((cate, index) => (
      <CarouselItem className="basis-1/2 md:basis-1/4" key={index}>
        <div
          className="relative rounded-lg overflow-hidden h-full max-h-[200px] cursor-pointer select-none"
          onClick={() => onChange({ label: cate.name, value: cate.handle })}
        >
          <Image
            src={
              cate?.metadata?.thumbnail ? cate?.metadata?.thumbnail : undefined
            }
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 w-full h-[6.75rem] bg-gradient-to-b from-black/0 to-black/100" />
          <div className="absolute left-2 bottom-2">
            <h3 className="uppercase font-semibold text-base text-white">
              {cate.name}
            </h3>
          </div>
        </div>
      </CarouselItem>
    ));
    return (
      <div className="flex flex-col gap-3 py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-semibold">Danh mục nổi bật</h3>
          </div>
        </div>
        <Carousel>
          <CarouselContent>{items}</CarouselContent>
        </Carousel>
      </div>
    );
  }

  return null;
};

export default CategoryCarousel;
