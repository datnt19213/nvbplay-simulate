"use client";
import {createSlice} from "@reduxjs/toolkit";

interface ProfileState {
  sidebarSelected: string;
  statusOrderSelected: string;
  signOutModal: boolean;
  addressModal: boolean;
  addressDeleteModal: boolean;
  addressUpdateModal: boolean;
  profileUpdateForm: any;
  updateInformationModal: boolean;
  passcodeModal: boolean;
  securityStatusModal: boolean;
  pinSmartOtpModal: boolean;
  pinSmartOtpCodeAuthenticationModal: boolean;
  resetPasswordModal: boolean;
}

const initialState: ProfileState = {
  sidebarSelected: "/profile/account-info",
  statusOrderSelected: "tatca",
  signOutModal: false,
  addressModal: false,
  addressDeleteModal: false,
  addressUpdateModal: false,
  profileUpdateForm: null,
  updateInformationModal: false,
  passcodeModal: false,
  securityStatusModal: false,
  pinSmartOtpModal: false,
  pinSmartOtpCodeAuthenticationModal: false,
  resetPasswordModal: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setSidebarSelected: (state, action) => {
      state.sidebarSelected = action.payload;
    },
    setStatusOrderSelected: (state, action) => {
      state.statusOrderSelected = action.payload;
    },
    setSignOutModal: (state, action) => {
      state.signOutModal = action.payload;
    },
    setAddressModal: (state, action) => {
      state.addressModal = action.payload;
    },
    setAddressDeleteModal: (state, action) => {
      state.addressDeleteModal = action.payload;
    },
    setAddressUpdateModal: (state, action) => {
      state.addressUpdateModal = action.payload;
    },
    setProfileUpdateForm: (state, action) => {
      state.profileUpdateForm = action.payload;
    },
    setUpdateInfomationModal: (state, action) => {
      state.updateInformationModal = action.payload;
    },
    setPasscodeModal: (state, action) => {
      state.passcodeModal = action.payload;
    },
    setSecurityStatusModal: (state, action) => {
      state.securityStatusModal = action.payload;
    },
    setPinSmartOtpModal: (state, action) => {
      state.pinSmartOtpModal = action.payload;
    },
    setPinSmartOtpCodeAuthenticationModal: (state, action) => {
      state.pinSmartOtpCodeAuthenticationModal = action.payload;
    },
    setResetPasswordModal: (state, action) => {
      state.resetPasswordModal = action.payload;
    },
  },
});

export const {
  setSidebarSelected,
  setStatusOrderSelected,
  setSignOutModal,
  setAddressModal,
  setAddressDeleteModal,
  setAddressUpdateModal,
  setProfileUpdateForm,
  setUpdateInfomationModal,
  setPasscodeModal,
  setSecurityStatusModal,
  setPinSmartOtpModal,
  setPinSmartOtpCodeAuthenticationModal,
  setResetPasswordModal,
} = profileSlice.actions;

export default profileSlice.reducer;
