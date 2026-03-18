"use client";

import { TagCheckbox } from "@/components/base-components/buttons/tag-checkbox";
import useGetCollectionsQuery from "@/hooks/queries/collections/useGetCollectionsQuery";
import useMediaQueryScreen from "@/hooks/useMediaQueryScreen";
import useSearchFilter from "@/hooks/useSearchFilter";
import { FilterOption } from "@/stores/search-slice";
import { Collection } from "@/types/collections/collections.type";
import { Loader2 } from "lucide-react";
import BaseDropdown from "./base-dropdown";
import Skeletons from "@/components/custom/skeletons";
import { Skeleton } from "@/components/ui/skeleton";


interface IProps {
  title: string;
}

const CollectionDropdown: React.FC<IProps> = ({ title }) => {
  const { data, isLoading, isSuccess } = useGetCollectionsQuery();

  const items: FilterOption[] =
    data?.map((i: Collection) => ({
      label: i.title,
      value: i.handle,
    })) || [];

  const { dispatchItem, handleSelect, selectedItems } = useSearchFilter(
    "selectedCollections"
  );
  const { isMobile } = useMediaQueryScreen();
  const onClick = (item: FilterOption) => {
    handleSelect(item);
    if (!isMobile) dispatchItem(item);
  };

  return (
    <BaseDropdown title={title} triggerClassName="text-[#38383D] font-semibold text-sm leading-5">
      {isLoading && (
        <Skeletons
          className="bg-transparent border-none flex-wrap"
          direction="row"
          gap={3}
          count={2}
        >
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
        </Skeletons>
      )}
      {isSuccess && items.length > 0 && (
        <div className="grid grid-cols-2 gap-[8px]">
          {items.map((item: FilterOption, index: number) => {
            const isSelected = selectedItems.some(
              (selected) => selected.value === item.value
            );
            return (
              <TagCheckbox
                title={item.label}
                isChecked={isSelected}
                onClick={() => onClick(item)}
                key={item.value}
              />
            );
          })}
        </div>
      )}
    </BaseDropdown>
  );
};

export default CollectionDropdown;
