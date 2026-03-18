"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum OrderByEnum {
  PRICE_ASC = "sort_price:asc",
  PRICE_DESC = "sort_price:desc",
  DATE_DESC = "date:desc",
}

export const SORT_OPTIONS = [
  {
    id: OrderByEnum.PRICE_DESC,
    label: "Giá cao đến thấp",
    value: OrderByEnum.PRICE_DESC,
  },
  {
    id: OrderByEnum.PRICE_ASC,
    label: "Giá thấp đến cao",
    value: OrderByEnum.PRICE_ASC,
  },
  {
    id: OrderByEnum.DATE_DESC,
    label: "Hàng mới nhất",
    value: OrderByEnum.DATE_DESC,
  },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export interface FilterOption {
  label: string;
  value: string;
  image?: string;
}

interface SearchState {
  triggerApply: boolean;
  totalItems: number;
  showSearch: boolean;
  showSearchSite: boolean;
  searchKeyword: string;
  selectedCategories: FilterOption[];
  selectedProviders: FilterOption[];
  selectedColors: FilterOption[];
  selectedMaterials: FilterOption[];
  selectedCollections: FilterOption[];
  selectedSaleChannel: FilterOption[];
  selectedPrice: {
    min: number;
    max: number;
  } | null;
  selectedSort: OrderByEnum | undefined;
}

export type FilterKey = keyof Omit<
  SearchState,
  | "showSearch"
  | "searchKeyword"
  | "selectedPrice"
  | "selectedSort"
  | "totalItems"
  | "selectedPrice"
  | "triggerApply"
  | "showSearchSite"
>;

const initialState: SearchState = {
  triggerApply: false,
  totalItems: 0,
  showSearch: false,
  showSearchSite: false,
  searchKeyword: "",
  selectedCategories: [],
  selectedProviders: [],
  selectedColors: [],
  selectedMaterials: [],
  selectedCollections: [],
  selectedSaleChannel: [],
  selectedPrice: null,
  selectedSort: undefined,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setShowSearch: (state, { payload }) => {
      state.showSearch = payload;
    },
    setShowSearchSite: (state, { payload }) => {
      state.showSearchSite = payload;
    },
    setSearchKeyword: (state, { payload }) => {
      state.searchKeyword = payload;
    },
    clearSelection: (state: SearchState, { payload }: PayloadAction<FilterKey>) => {
      state[payload] = [];
    },
    toggleSelection: (
      state,
      {
        payload,
      }: {
        payload: {
          key: FilterKey;
          option: FilterOption;
        };
      }
    ) => {
      const list = state[payload.key];
      if (Array.isArray(list)) {
        const existingIndex = list.findIndex(
          (item) => item.value === payload.option.value
        );
        if (existingIndex !== -1) {
          state[payload.key] = list.filter(
            (_, index) => index !== existingIndex
          ) as FilterOption[];
        } else {
          list.push(payload.option);
        }
      }
    },
    clearAllSelected: (state) => {
      state.selectedCategories = [];
      state.selectedProviders = [];
      state.selectedColors = [];
      state.selectedMaterials = [];
      state.selectedCollections = [];
      state.selectedSaleChannel = [];
      state.selectedPrice = null;
      state.selectedSort = undefined;
    },
    setSelectedPrice: (state, { payload }) => {
      console.log(" state.selectedPrice", state.selectedPrice);
      state.selectedPrice = payload;
    },
    setSelectedSort: (state, { payload }) => {
      state.selectedSort = payload;
    },
    setTotalItems: (state, { payload }) => {
      state.totalItems = payload;
    },
    setTriggerApply: (state, { payload }) => {
      state.triggerApply = payload;
    },
    resetSearch: () => initialState,
  },
});

export const {
  setShowSearch,
  setTriggerApply,
  setSearchKeyword,
  toggleSelection,
  clearAllSelected,
  clearSelection,
  setSelectedPrice,
  resetSearch,
  setSelectedSort,
  setTotalItems,
  setShowSearchSite,
} = searchSlice.actions;

export default searchSlice.reducer;
