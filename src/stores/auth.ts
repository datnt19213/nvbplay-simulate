"use client";
import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
  form:
    | "signin"
    | "signup"
    | "forgot_password"
    | "new_password"
    | "success_signin"
    | "success_signup"
    | "success_forgot_password";
  isSubmitSignup: boolean;
  isSubmitSignin: boolean;
  isRememberPass: boolean;
}

const initialState: AuthState = {
  form: "signin",
  isSubmitSignup: false,
  isSubmitSignin: false,
  isRememberPass: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCurrentForm: (state, action) => {
      state.form = action.payload;
    },
    setSignupFormData: (state, action) => {
      state.isSubmitSignup = action.payload;
    },
    setSigninFormData: (state, action) => {
      state.isSubmitSignin = action.payload;
    },
    setIsRememberPass: (state, action) => {
      state.isRememberPass = action.payload;
    },
  },
});

export const {
  setCurrentForm,
  setSigninFormData,
  setSignupFormData,
  setIsRememberPass,
} = authSlice.actions;

export default authSlice.reducer;
