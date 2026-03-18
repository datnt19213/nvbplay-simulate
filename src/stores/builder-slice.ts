"use client";
import {createSlice} from "@reduxjs/toolkit";

type PricesFilter = {
  from: any;
  to: any;
};

export type BuilderFilters = {
  prices: PricesFilter;
  brands: any[];
  colors: any[];
  materials: any[];
  weights: any[];
};

export type SetupEquipment = {
  subject: any;
  level: any;
};

export type SaveEquipment = {
  image: any;
  equipmentName: string;
} & SetupEquipment;

interface BuilderState {
  filters: BuilderFilters | null;
  currentSetEquipment: null;
  changeSetupEquipment: SetupEquipment | null;
  saveEquipment: SaveEquipment | null;

  // modal
  viewMoreModal: boolean;
  changeSetupEquipmentModal: boolean;
  chooseSuitableFeatureModal: boolean;
  shareEquipmentModal: boolean;
  saveEquipmentModal: boolean;
  filtersSearchModal: boolean;
  viewDetailEquipmentSetModal: boolean;
}

const initialState: BuilderState = {
  filters: null,
  currentSetEquipment: null,
  changeSetupEquipment: null,
  saveEquipment: null,

  // modal
  viewMoreModal: false,
  changeSetupEquipmentModal: false,
  chooseSuitableFeatureModal: false,
  shareEquipmentModal: false,
  saveEquipmentModal: false,
  filtersSearchModal: false,
  viewDetailEquipmentSetModal: false,
};

export const builderSlice = createSlice({
  name: "builder",
  initialState: initialState,
  reducers: {
    setFilterBuilder: (state, action: {payload: BuilderFilters}) => {
      state.filters = action.payload;
    },

    setCurrentSetQuipment: (state, action: {payload: any}) => {
      state.currentSetEquipment = action.payload;
    },

    setChangeSetupEquipment: (state, action: {payload: SetupEquipment}) => {
      state.changeSetupEquipment = action.payload;
    },
    setSaveEquipment: (state, action: {payload: SaveEquipment}) => {
      state.saveEquipment = action.payload;
    },

    // modal reducer
    setChangeSetupEquipmentModal: (state, action: {payload: boolean}) => {
      state.changeSetupEquipmentModal = action.payload;
    },
    setViewMoreModal: (state, action: {payload: boolean}) => {
      state.viewMoreModal = action.payload;
    },
    setChooseSuitableFeatureModal: (state, action: {payload: boolean}) => {
      state.chooseSuitableFeatureModal = action.payload;
    },
    setShareEquipmentModal: (state, action: {payload: boolean}) => {
      state.shareEquipmentModal = action.payload;
    },
    setSaveEquipmentModal: (state, action: {payload: boolean}) => {
      state.saveEquipmentModal = action.payload;
    },
    setFiltersSearchModal: (state, action: {payload: boolean}) => {
      state.filtersSearchModal = action.payload;
    },
    setViewDetailEquipmentSetModal: (state, action: {payload: boolean}) => {
      state.viewDetailEquipmentSetModal = action.payload;
    },
  },
});

export const {
  setFilterBuilder,
  setChangeSetupEquipmentModal,
  setViewMoreModal,
  setChooseSuitableFeatureModal,
  setShareEquipmentModal,
  setSaveEquipmentModal,
  setFiltersSearchModal,
  setCurrentSetQuipment,
  setChangeSetupEquipment,
  setSaveEquipment,
  setViewDetailEquipmentSetModal,
} = builderSlice.actions;

export default builderSlice.reducer;
