"use client";

import Image from "@/components/base-components/images/image";
import Skeletons from "@/components/custom/skeletons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import useGetCategoriesQuery from "@/hooks/queries/categories/useGetCategoriesQuery";
import useSearchFilter from "@/hooks/useSearchFilter";
import settingsServiceInstance from "@/services/settings";
import { FilterOption } from "@/stores/search-slice";
import { useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";

const CategoriesCarousel = () => {
  const router = useRouter();
  const { data, isLoading } = useGetCategoriesQuery();
  const { dispatchItem, handleSelect, selectedItems } =
    useSearchFilter("selectedCategories");

  const onChange = (item: FilterOption) => {
    handleSelect(item);
    dispatchItem(item);
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
      <>
        <div className="hidden md:block">
          <Skeletons
            count={4}
            gap={5}
            className="h-[10rem] md:h-[10rem] flex flex-col justify-between"
          >
            <div />
            <Skeleton className="h-6 w-[60%]" />
          </Skeletons>
        </div>

        <div className="block md:hidden">
          <Skeletons
            count={2}
            gap={2}
            className="h-[10rem] md:h-[10rem] flex flex-col justify-between"
          >
            <div />
            <Skeleton className="h-6 w-[60%]" />
          </Skeletons>
        </div>
      </>
    );

  if (categories && categories.length > 0) {
    const items = categories.map((cate, index) => (
      <CarouselItem className="basis-1/2 md:basis-1/4" key={index}>
        <div
          className="relative rounded-lg overflow-hidden h-full cursor-pointer select-none"
          onClick={() => onChange({ label: cate.name, value: cate.handle })}
        >
          <Image
            src={
              cate?.metadata?.thumbnail ? cate?.metadata?.thumbnail : undefined
            }
            className="w-full h-full"
            classNameImage="object-cover w-full h-full"
          />

          <div className="absolute inset-x-0 bottom-0 w-full h-[6.75rem] bg-gradient-to-b from-black/0 to-black/100" />
          <div className="absolute left-5 bottom-5">
            <h3 className="uppercase font-semibold text-xl text-white">
              {cate.name}
            </h3>
          </div>
        </div>
      </CarouselItem>
    ));
    return (
      <Carousel opts={{ align: "start", dragFree: true }}>
        <CarouselContent>{items}</CarouselContent>
        <CarouselPrevious className="hidden desktop:inline-flex absolute -left-5 text-primary" />
        <CarouselNext className="hidden desktop:inline-flex absolute -right-5 text-primary" />
      </Carousel>
    );
  }
};

export default CategoriesCarousel;
