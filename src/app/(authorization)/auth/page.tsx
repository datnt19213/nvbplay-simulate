"use client";
import {NotiSuccessPrimary} from "@/components/base-components/notifications";
import {ForgotPassword, SignIn, SignUp} from "@/features/auth";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {translate} from "@/utilities/translator";
import React from "react";
import {useSelector} from "react-redux";

const Auth = () => {
  const {form} = useSelector((state: RootState) => state.auth);
  return (
    <div className="min-w-full md:min-w-[480px] h-full">
      {form === "signin" && (
        <div
          className={cn(
            "w-full animate-duration-1000",
            form === "signin" && "animate-fade-right"
          )}
        >
          <SignIn />
        </div>
      )}
      {form === "signup" && (
        <div
          className={cn(
            "w-full animate-duration-1000",
            form === "signup" && "animate-fade-left"
          )}
        >
          <SignUp />
        </div>
      )}
      {form === "forgot_password" && (
        <div
          className={cn(
            "w-full h-full animate-duration-1000",
            form === "forgot_password" && "animate-fade-left"
          )}
        >
          <ForgotPassword />
        </div>
      )}
      {form === "success_forgot_password" && (
        <div
          className={cn(
            "w-full animate-duration-1000",
            form === "success_forgot_password" && "animate-fade-up"
          )}
        >
          <NotiSuccessPrimary
            isButton={false}
            subTitle={translate(
              "please_check_your_email_to_perform_password_recovery"
            )}
            title={translate("request_sent_success")}
          />
        </div>
      )}
      {/* {form === "success_signin" && (
        <div
          className={cn(
            "w-full animate-duration-1000",
            form === "success_signin" && "animate-fade-left"
          )}
        >
          <SignUp />
        </div>
      )}
      {form === "success_signup" && (
        <div
          className={cn(
            "w-full animate-duration-1000",
            form === "success_signup" && "animate-fade-left"
          )}
        >
          <NotiSuccessPrimary
            buttonTitle={"Bắt đầu mua sắm"}
            handleOnClick={() => null}
            subTitle="Bắt đầu mua sắm và nhận ưu đãi ngay nhé!"
            title="Đăng ký thành công"
          />
        </div>
      )} */}
    </div>
  );
};

export default Auth;
