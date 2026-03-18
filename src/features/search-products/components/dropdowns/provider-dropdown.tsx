"use client";

import { TagCheckbox } from "@/components/base-components/buttons/tag-checkbox";
import Skeletons from "@/components/custom/skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { useBrands } from "@/hooks/queries/brands";
import useMediaQueryScreen from "@/hooks/useMediaQueryScreen";
import useSearchFilter from "@/hooks/useSearchFilter";
import { FilterOption } from "@/stores/search-slice";
import { IBrand } from "@/types/brands";
import BaseDropdown from "./base-dropdown";

interface IProps {
  title: string;
}

const ProviderDropdown: React.FC<IProps> = ({ title }) => {
  const { dispatchItem, handleSelect, selectedItems } =
    useSearchFilter("selectedProviders");
  const { isMobile } = useMediaQueryScreen();
  const { data: brands, isLoading, isSuccess } = useBrands();

  const onClick = (item: any) => {
    handleSelect(item);
    if (!isMobile) dispatchItem(item);
  };

  const items: FilterOption[] =
    brands?.map((i: IBrand) => ({
      label: i.name,
      value: i.slug,
      image: i.thumbnail,
    })) || [];

  return (
    <BaseDropdown
      title={title}
      triggerClassName="text-[#38383D] font-semibold text-sm leading-5"
    >
      <div className="grid grid-cols-2 gap-[8px]">
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
          <>
            {items.map((i, index) => {
              const isSelected = selectedItems.some(
                (selected) => selected.value === i.value
              );

              return (
                <TagCheckbox
                  title={i.label}
                  image={i.image}
                  isChecked={isSelected}
                  onClick={() => onClick(i)}
                  key={index}
                />
              );
            })}
          </>
        )}
      </div>
    </BaseDropdown>
  );
};

export default ProviderDropdown;
