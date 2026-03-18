"use client";
import { RootState } from "@/stores";
import {
    clearSelection,
  FilterKey,
  FilterOption,
  setSearchKeyword,
  setTriggerApply,
  toggleSelection,
} from "@/stores/search-slice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

const useSearchFilter = (key: FilterKey) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState<FilterOption[]>([]);
  const searchState = useSelector((state: RootState) => state.search);
  const pathname = usePathname();
  const { triggerApply } = searchState;
  const selectedItemsState = searchState[key];

  type SearchState = {
    selectedCategories: { value: string }[];
    selectedCollections: { value: string }[];
    selectedProviders: { value: string }[];
    selectedColors: { value: string }[];
    selectedMaterials: { value: string }[];
    selectedSaleChannel: { value: string }[];
  };

  useEffect(() => {
    setSelectedItems(selectedItemsState);
  }, [selectedItemsState]);

  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/products") {
      const params = new URLSearchParams(window.location.search);

      const query = searchState.searchKeyword;
      if (query) {
        params.set("q", query);
      }

      // Define allowed keys explicitly
      const filterKeys: Array<keyof SearchState> = [
        "selectedCategories",
        "selectedCollections",
        "selectedProviders",
        "selectedColors",
        "selectedMaterials",
        "selectedSaleChannel",
      ];

      filterKeys.forEach((key) => {
        const selectedValues = searchState[key]
          ?.map((item) => item.value)
          .join(",");
        if (selectedValues && selectedValues.length > 0) {
          params.set(key.replace("selected", "").toLowerCase(), selectedValues);
        } else {
          params.delete(key.replace("selected", "").toLowerCase());
        }
      });

      window.history.pushState({}, "", `${pathname}?${params.toString()}`);
    }
  }, [
    searchState.selectedCategories,
    searchState.selectedCollections,
    searchState.selectedProviders,
    searchState.selectedColors,
    searchState.selectedMaterials,
    searchState.selectedSaleChannel,
    pathname,
    searchState.searchKeyword,
  ]);


  useEffect(() => {
    if (triggerApply) {
      selectedItems.forEach((item) =>
        dispatch(
          toggleSelection({
            key,
            option: item,
          })
        )
      );
      dispatch(setTriggerApply(false));
    }
  }, [triggerApply]);

  const handleSelect = (option: FilterOption) => {
    const updatedItems = selectedItems.find(
      (item) => item.value === option.value
    )
      ? selectedItems.filter((item) => item.value !== option.value)
      : [...selectedItems, option];

    setSelectedItems(updatedItems);
  };

  const handleClearSelection = (key: FilterKey) => {
    dispatch(clearSelection(key));
  };

  const dispatchItem = (option: FilterOption) => {
    dispatch(
      toggleSelection({
        key,
        option,
      })
    );
  };

  return {
    selectedItems,
    handleSelect,
    dispatchItem,
    handleClearSelection,
  };
};

export default useSearchFilter;
