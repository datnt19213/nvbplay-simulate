"use client";
import {createSlice} from "@reduxjs/toolkit";

interface AddressState {
  addressDeletedSelected: null;
  addressUpdateSelected: any;
  addressCreateFormDataInit: any;
  addressUpdateFormDataInit: any;
  addressCreateFormData: any;
  addressUpdateFormData: any;
  isDefaultAddressCreate: boolean;
  isDefaultAddressUpdate: boolean;
  citiesCreate: any[];
  districtsCreate: any[];
  wardsCreate: any[];
  citiesUpdate: any[];
  districtsUpdate: any[];
  wardsUpdate: any[];
  provinceSelectedCreate: any | null;
  provinceSelectedUpdate: any | null;
  districtSelectedCreate: any | null;
  districtSelectedUpdate: any | null;
  wardSelectedCreate: any | null;
  wardSelectedUpdate: any | null;
}

const initialState: AddressState = {
  addressDeletedSelected: null,
  addressUpdateSelected: null,
  addressCreateFormDataInit: {},
  addressUpdateFormDataInit: {},
  addressCreateFormData: {},
  addressUpdateFormData: {},
  isDefaultAddressCreate: false,
  isDefaultAddressUpdate: false,
  citiesCreate: [],
  districtsCreate: [],
  wardsCreate: [],
  citiesUpdate: [],
  districtsUpdate: [],
  wardsUpdate: [],
  provinceSelectedCreate: null,
  provinceSelectedUpdate: null,
  districtSelectedCreate: null,
  districtSelectedUpdate: null,
  wardSelectedCreate: null,
  wardSelectedUpdate: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    setAddressDeletedSelected: (state, action) => {
      state.addressDeletedSelected = action.payload;
    },
    setAddressUpdateSelected: (state, action) => {
      state.addressUpdateSelected = action.payload;
    },
    setAddressCreateFormDataInit: (state, action) => {
      state.addressCreateFormDataInit = action.payload;
    },
    setAddressUpdateFormDataInit: (state, action) => {
      state.addressUpdateFormDataInit = action.payload;
    },
    setAddressCreateFormData: (state, action) => {
      state.addressCreateFormData = action.payload;
    },
    setAddressUpdateFormData: (state, action) => {
      state.addressUpdateFormData = action.payload;
    },
    setAddressCreateIsDefault: (state, action) => {
      state.isDefaultAddressCreate = action.payload;
    },
    setAddressUpdateIsDefault: (state, action) => {
      state.isDefaultAddressUpdate = action.payload;
    },
    setCitiesCreate: (state, action) => {
      state.citiesCreate = action.payload;
    },
    setDistrictsCreate: (state, action) => {
      state.districtsCreate = action.payload;
    },
    setWardsCreate: (state, action) => {
      state.wardsCreate = action.payload;
    },
    setCitiesUpdate: (state, action) => {
      state.citiesUpdate = action.payload;
    },
    setDistrictsUpdate: (state, action) => {
      state.districtsUpdate = action.payload;
    },
    setWardsUpdate: (state, action) => {
      state.wardsUpdate = action.payload;
    },
    setProvinceSelectedCreate: (state, action) => {
      state.provinceSelectedCreate = action.payload;
    },
    setProvinceSelectedUpdate: (state, action) => {
      state.provinceSelectedUpdate = action.payload;
    },
    setDistrictSelectedCreate: (state, action) => {
      state.districtSelectedCreate = action.payload;
    },
    setDistrictSelectedUpdate: (state, action) => {
      state.districtSelectedCreate = action.payload;
    },
  },
});

export const {
  setAddressDeletedSelected,
  setAddressUpdateSelected,
  setAddressCreateFormData,
  setAddressUpdateFormData,
  setAddressCreateIsDefault,
  setAddressUpdateIsDefault,
  setCitiesCreate,
  setDistrictsCreate,
  setWardsCreate,
  setCitiesUpdate,
  setDistrictsUpdate,
  setWardsUpdate,
  setDistrictSelectedCreate,
  setDistrictSelectedUpdate,
  setProvinceSelectedCreate,
  setProvinceSelectedUpdate,
  setAddressCreateFormDataInit,
  setAddressUpdateFormDataInit,
} = addressSlice.actions;

export default addressSlice.reducer;
