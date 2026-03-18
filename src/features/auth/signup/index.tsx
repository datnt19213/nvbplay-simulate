"use client";
import {Zalo, Telegram} from "@/assets/icons";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import TextInput from "@/components/base-components/input/text-input";
import {Icon} from "@/components/common-components";
import {Button} from "@/components/ui/button";
import {setCurrentForm} from "@/stores/auth";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SocialAuth from "../components/social-auth";
import SignupForm from "../components/signup-form";
import {SubmitSignupFunction} from "@/services/authentication/signup";
import {RootState} from "@/stores";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col w-full justify-center max-w-[223px] items-center text-center gap-1">
        <span className="text-2xl font-semibold text-txtprimary">
          Đăng ký tài khoản
        </span>
        <span className="text-sm font-medium text-gray-icon">
          Nhận ngay nhiều ưu đãi hấp dẫn!
        </span>
      </div>
      <div className="flex flex-col gap-5 max-w-[320px] w-full">
        <SignupForm
          handleSubmitSignup={(signupFormData) =>
            SubmitSignupFunction(
              signupFormData.email,
              signupFormData.password,
              signupFormData.fullName,
              signupFormData.phone
            )
          }
          onShowPass={(value) => setShowPass(value)}
          showPass={showPass}
        />

        <div className="flex border-b mt-8 items-center justify-center w-full">
          <span className="font-medium text-sm -mb-2 px-4 bg-white">
            Hoặc đăng nhập bằng
          </span>
        </div>
        <SocialAuth />
        <div className="flex items-center justify-center mt-8 text-sm font-medium">
          Bạn đã có tài khoản?
          <span
            className="text-sm font-semibold ml-2 cursor-pointer"
            onClick={() => dispatch(setCurrentForm("signin"))}
          >
            Đăng nhập ngay
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
