"use client";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import useAuthMutation from "@/hooks/mutations/auths/useAuthMutation";
import {setCurrentForm, setIsRememberPass} from "@/stores/auth";
import {useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import SignInFormV2 from "../components/sign-in-form-v2";
import SocialAuth from "../components/social-auth";
import {translate} from "@/utilities/translator";

const SignIn = () => {
  const dispatch = useDispatch();
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    dispatch(setIsRememberPass(isRemember));
  }, [isRemember]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col w-full justify-center max-w-[223px] items-center text-center gap-1">
          <span className="text-2xl font-semibold text-txtprimary">
            Xin chào
          </span>
          <span className="text-sm font-medium text-gray-icon">
            Chào mừng bạn đến với NVB Play!
          </span>
        </div>
        <div className="flex flex-col gap-5 max-w-[320px] w-full">
          <SignInFormV2 />
          <div className="flex justify-between ">
            <Label
              htmlFor="cbx-remember-password"
              className="flex items-center gap-1"
            >
              <Input
                type="checkbox"
                id="cbx-remember-password"
                className="size-6 checked:accent-txtprimary"
                checked={isRemember}
                onChange={(e) => setIsRemember(e.target.checked)}
              />
              <span className="font-medium text-sm">Ghi nhớ mật khẩu</span>
            </Label>
            <span
              className="font-medium text-sm cursor-pointer select-none"
              onClick={() => dispatch(setCurrentForm("forgot_password"))}
            >
              {translate("forgot_password")}?
            </span>
          </div>
          <div className="flex border-b mt-8 items-center justify-center w-full">
            <span className="font-medium text-sm -mb-2 px-4 bg-white">
              Hoặc đăng nhập bằng
            </span>
          </div>
          <SocialAuth />
          <div className="flex items-center justify-center mt-8 text-sm font-medium">
            Bạn chưa có tài khoản?
            <span
              className="text-sm font-semibold ml-2 cursor-pointer select-none"
              onClick={() => dispatch(setCurrentForm("signup"))}
            >
              Đăng ký ngay
            </span>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SignIn;
