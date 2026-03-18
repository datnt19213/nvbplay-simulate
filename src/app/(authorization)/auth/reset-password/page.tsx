"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import TextInput from "@/components/base-components/input/text-input";
import {toastNVB} from "@/components/base-components/toast";
import {Icon} from "@/components/common-components";
import {ENUM} from "@/configs";
import {useAuthResetPasswordMutation} from "@/hooks/mutations/auths/useAuthMutation";
import {useFormValidator, REGEXS} from "@/hooks/validators";
import {base64UrlDecode, DecryptBasic} from "@/utilities/hash-aes";
import {translate} from "@/utilities/translator";
import {redirect, RedirectType, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

const ResetPassword = () => {
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const [showPass, setShowPass] = useState(false);
  const {resetPassword, isSuccess, isPending} = useAuthResetPasswordMutation();
  const {values, errors, handleChange, validateAllFields, resetForm} =
    useFormValidator(
      {
        password: "",
        confirmPassword: "",
      },
      {
        password: {
          required: true,
          minLength: 8,
          pattern: REGEXS.password,
          errorMessage: translate(
            "the_password_must_be_at_least_8_characters_long_and_contain_at_least_one_uppercase_a_regular_letter_some_and_a_special_character"
          ),
        },
        confirmPassword: {
          required: true,
          minLength: 8,
          pattern: REGEXS.password,
          errorMessage: translate(
            "the_password_must_be_at_least_8_characters_long_and_contain_at_least_one_uppercase_a_regular_letter_some_and_a_special_character"
          ),

          custom: (value: string): boolean => value === values.password,
        },
      }
    );

  useEffect(() => {
    const recallToAuth = () => {
      if (isSuccess) {
        redirect("/auth", RedirectType.replace);
      }
    };
    recallToAuth();
    console.log("====================================");
    console.log(
      DecryptBasic(
        base64UrlDecode(email as string),
        ENUM.SECRET_AES_TOKEN_RESET_PASS_HASH
      ) as string
    );
    console.log("====================================");
    console.log("====================================");
    console.log(
      DecryptBasic(
        base64UrlDecode(token as string),
        ENUM.SECRET_AES_TOKEN_RESET_PASS_HASH
      ) as string
    );
    console.log("====================================");
  }, [isSuccess]);

  function handleSubmit() {
    if (validateAllFields()) {
      try {
        if (values.password.trim() === values.confirmPassword.trim()) {
          resetPassword({
            email: DecryptBasic(
              base64UrlDecode(email as string),
              ENUM.SECRET_AES_TOKEN_RESET_PASS_HASH
            ) as string,
            token: DecryptBasic(
              base64UrlDecode(token as string),
              ENUM.SECRET_AES_TOKEN_RESET_PASS_HASH
            ) as string,
            password: values.password.trim(),
          });
        }
        resetForm();
      } catch (error) {}
    } else {
      toastNVB({
        type: "error",
        msg: translate("please_enter_valid_all_fields"),
      });
    }
  }
  return (
    <div className="w-full md:min-w-[480px] h-full">
      <div className="w-full animate-duration-1000 animate-fade-right">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="flex flex-col w-full justify-center max-w-[223px] items-center text-center gap-1">
            <span className="text-2xl font-semibold text-txtprimary">
              {translate("enter_new_password")}
            </span>
            <span className="text-sm font-medium text-gray-icon">
              {translate(
                "please_enter_the_new_password_to_recover_the_account"
              )}
            </span>
          </div>
          <div className="flex flex-col gap-5 max-w-[320px] w-full">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-sm font-medium text-txtprimary">
                {translate("password")}
              </span>
              <TextInput
                onChange={(e) => handleChange("password", e.target.value)}
                value={values.password}
                placeholder={translate("enter_password")}
                type={showPass ? "text" : "password"}
                leftIcon={<Icon icon="ph:lock-simple" fontSize={24} />}
                className="text-txtprimary"
                rightIcon={
                  <Icon
                    icon={showPass ? "ph:eye-closed" : "ph:eye"}
                    fontSize={24}
                    onClick={() => setShowPass(!showPass)}
                  />
                }
              />
              {errors.password && values.password != "" && (
                <span className="text-xs font-medium text-red-primary">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <span className="text-sm font-medium text-txtprimary">
                {translate("confirm_password")}
              </span>
              <TextInput
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                value={values.confirmPassword}
                placeholder={translate("confirm_password")}
                type={showPass ? "text" : "password"}
                leftIcon={<Icon icon="ph:lock-simple" fontSize={24} />}
                className="text-txtprimary"
                rightIcon={
                  <Icon
                    icon={showPass ? "ph:eye-closed" : "ph:eye"}
                    fontSize={24}
                    onClick={() => setShowPass(!showPass)}
                  />
                }
              />
              {errors.password && values.confirmPassword != "" && (
                <span className="text-xs font-medium text-red-primary">
                  {errors.password}
                </span>
              )}
            </div>
            <ButtonSubmitPrimary
              disabled={isPending}
              isLoading={isPending}
              onClickHandle={handleSubmit}
            >
              {translate("recovery_account")}
            </ButtonSubmitPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
