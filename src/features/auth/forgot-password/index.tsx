"use client";
import React from "react";
import {setCurrentForm} from "@/stores/auth";
import {useDispatch, useSelector} from "react-redux";
import {Icon} from "@/components/common-components";
import {translate} from "@/utilities/translator";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import TextInput from "@/components/base-components/input/text-input";
import {toastNVB} from "@/components/base-components/toast";
import {useAuthRequestResetPasswordMutation} from "@/hooks/mutations/auths/useAuthMutation";
import {useFormValidator, REGEXS} from "@/hooks/validators";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const {requestResetPassword, isPending, isSuccess} =
    useAuthRequestResetPasswordMutation();
  const {
    values,
    errors,
    setValues,
    handleChange,
    validateAllFields,
    resetForm,
  } = useFormValidator(
    {
      email: "",
    },
    {
      email: {
        required: true,
        pattern: REGEXS.email,
        errorMessage: translate("please_enter_valid_email"),
      },
    }
  );
  function handleSendRequest(): void {
    if (validateAllFields()) {
      requestResetPassword(values.email.trim());
      resetForm();
    } else {
      toastNVB({
        type: "error",
        msg: translate("please_enter_valid_all_fields"),
      });
    }
  }
  return (
    <div className="flex h-full flex-col gap-40 justify-between items-center">
      <div className="h-full w-full flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col w-full justify-center max-w-[223px] items-center text-center gap-1">
          <span className="text-2xl font-semibold text-txtprimary">
            {translate("forgot_password")}
          </span>
          <span className="text-sm font-medium text-gray-icon">
            {translate("please_enter_your_email_to_recover_the_password")}
          </span>
        </div>
        <div className="flex flex-col gap-5 max-w-[320px] h-full w-full">
          <div className="h-fit desktop:h-full">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-sm font-medium text-txtprimary">Email</span>
              <TextInput
                onChange={(e) => {
                  handleChange("email", e.target.value);
                }}
                onSubmitByEnter={() => handleSendRequest()}
                placeholder={translate("enter_email")}
                value={values.email}
                leftIcon={
                  <Icon
                    icon="tabler:mail"
                    fontSize={24}
                    className="text-txtprimary"
                  />
                }
              />
              {errors.email && values.email != "" && (
                <span className="text-xs font-medium text-red-primary">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <ButtonSubmitPrimary
            disabled={isPending}
            isLoading={isPending}
            onClickHandle={() => handleSendRequest()}
          >
            {translate("send_request")}
          </ButtonSubmitPrimary>
        </div>
      </div>
      <div
        className="text-sm flex gap-2 items-center font-semibold cursor-pointer"
        onClick={() => dispatch(setCurrentForm("signin"))}
      >
        <Icon icon={"tabler:arrow-bar-left"} fontSize={24} fill="#808089" />{" "}
        <span className="border-l pl-2">{translate("back_to_sign_in")}</span>
      </div>
    </div>
  );
};

export default ForgotPassword;
