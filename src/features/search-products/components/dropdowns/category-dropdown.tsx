"use client";

import { Checkbox } from "@/components/ui/checkbox";
import useGetCategoriesQuery from "@/hooks/queries/categories/useGetCategoriesQuery";
import useMediaQueryScreen from "@/hooks/useMediaQueryScreen";
import useSearchFilter from "@/hooks/useSearchFilter";
import { FilterOption } from "@/stores/search-slice";
import { ChevronDown, Loader2, Plus } from "lucide-react";
import BaseDropdown from "./base-dropdown";
import { useEffect, useMemo, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Skeletons from "@/components/custom/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  title: string;
}

const CategoryDropdown: React.FC<IProps> = ({ title }) => {
  const { dispatchItem, handleSelect, selectedItems } =
    useSearchFilter("selectedCategories");
  const { data, isLoading, isSuccess } = useGetCategoriesQuery();
  const { isMobile } = useMediaQueryScreen();
  const [isOpen, setIsOpen] = useState<boolean[]>([true]);

  const items: FilterOption[] =
    data?.map((i) => ({
      label: i.name,
      value: i.handle,
    })) || [];

  const onChange = (item: FilterOption) => {
    handleSelect(item);
    if (!isMobile) dispatchItem(item);
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

  //Init state isOpen
  useEffect(() => {
    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        if (category.children.length > 0) {
          setIsOpen((prev) => [...prev, true]);
        }
      });
    }
  }, [categories]);

  return (
    <BaseDropdown
      title={title}
      triggerClassName="text-[#38383D] font-semibold text-sm leading-5"
    >
      <div className="space-y-[8px]">
        {isLoading && (
          <Skeletons
            className="bg-transparent border-none"
            direction="column"
            gap={3}
            count={4}
          >
            <div className="flex items-center space-x-2">
              <Skeleton className="h-[20px] w-[20px]" />
              <Skeleton className="h-[20px] w-full" />
            </div>
          </Skeletons>
        )}
        {isSuccess && categories.length > 0 && (
          <>
            {categories.map((item, index) => {
              const isSelected = selectedItems.some(
                (selected) => selected.value === item.handle
              );

              return (
                <div className="flex flex-col pb-1" key={item.id}>
                  <Collapsible
                    open={isOpen[index]}
                    onOpenChange={(open) => {
                      const newIsOpen = [...isOpen];
                      newIsOpen[index] = open;
                      setIsOpen(newIsOpen);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 pb-1">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() =>
                            onChange({
                              label: item.name,
                              value: item.handle,
                            })
                          }
                          className="data-[state=checked]:!bg-[#0d5bb5] data-[state=checked]:border-[#0d5bb5] bg-[#F5F5FA] border-[#DDDDE3] rounded-[0.25rem]"
                          id={item.id}
                        />
                        <label
                          htmlFor={item.id}
                          className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.name}
                        </label>
                      </div>
                      <CollapsibleTrigger
                        asChild
                        className={cn(
                          "p-0",
                          item.children.length <= 0 && "hidden"
                        )}
                      >
                        <Plus
                          className={cn(
                            "size-4 transition-all duration-300 ease-linear",
                            isOpen[index] && "rotate-[225deg] text-primary"
                          )}
                        />
                      </CollapsibleTrigger>
                    </div>
                    {item.children.length > 0 && (
                      <CollapsibleContent>
                        <div className="ml-3.5 flex flex-col gap-3 border-l border-dashed border-gray-300 pl-3 pt-2">
                          {item.children.map((child: any) => {
                            const isSelectedChild = selectedItems.some(
                              (selected) => selected.value === child.handle
                            );
                            return (
                              <div
                                className="flex items-center space-x-2"
                                key={child.id}
                              >
                                <Checkbox
                                  checked={isSelectedChild}
                                  onCheckedChange={() =>
                                    onChange({
                                      label: child.name,
                                      value: child.handle,
                                    })
                                  }
                                  className="data-[state=checked]:!bg-[#0d5bb5] data-[state=checked]:border-[#0d5bb5] bg-[#F5F5FA] border-[#DDDDE3] rounded-[0.25rem]"
                                  id={child.id}
                                />
                                <label
                                  htmlFor={child.id}
                                  className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {child.name}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </div>
              );
            })}
          </>
        )}
      </div>
    </BaseDropdown>
  );
};

export default CategoryDropdown;
