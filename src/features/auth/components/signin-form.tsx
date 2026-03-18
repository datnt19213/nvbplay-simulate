"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import TextInput from "@/components/base-components/input/text-input";
import {OverlayTransparent} from "@/components/base-components/overlays";
import {ToastError} from "@/components/base-components/toast";
import {Icon} from "@/components/common-components";
import {ENUM} from "@/configs";
import {REGEXS, useFormValidator} from "@/hooks/validators";
import {setOverlay} from "@/stores/theme";
import React, {FC, useState} from "react";
import {useDispatch} from "react-redux";
type SigninFormProps = {
  handleSubmitSignin: (data?: any) => void;
  onShowPass: (show: boolean) => void;
  showPass: boolean;
};
const SigninForm: FC<SigninFormProps> = ({
  handleSubmitSignin,
  onShowPass,
  showPass,
}) => {
  const {values, validateAllFields, handleChange, errors} = useFormValidator(
    {
      email: "",
      password: "",
    },
    {
      email: {
        required: true,
        pattern: REGEXS.email,
        // errorMessage: "Please enter a valid email",
        errorMessage: "Vui lòng nhập email hợp lệ",
      },
      password: {
        required: true,
        minLength: 8,
        pattern: REGEXS.password,
        errorMessage:
          // "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          "Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất một chữ hoa, một chữ cái viết thường, một số và một ký tự đặc biệt",
      },
    }
  );
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  function handleSubmit(): void {
    setLoad(true);
    dispatch(setOverlay(true));
    setTimeout(() => {
      if (validateAllFields()) {
        handleSubmitSignin(values);
        handleChange("email", "");
        handleChange("password", "");
      } else {
        // ToastError({msg: "Please enter a valid all fields"});
        ToastError({msg: "Vui lòng nhập tất cả các trường hợp lệ"});
      }
      dispatch(setOverlay(false));
      setLoad(false);
    }, 1000);
  }

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <span className="text-sm font-medium text-txtprimary">Email</span>
        <TextInput
          onChange={(e) => handleChange("email", e.target.value)}
          value={values.email}
          placeholder="Địa chỉ email"
          leftIcon={
            <Icon
              icon="ph:envelope-simple"
              fontSize={24}
              className="text-txtprimary"
            />
          }
        />
        {errors.email && (
          <span className="text-xs font-medium text-red-primary">
            {errors.email}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 w-full">
        <span className="text-sm font-medium text-txtprimary">Password</span>
        <TextInput
          onChange={(e) => handleChange("password", e.target.value)}
          onSubmitByEnter={() => handleSubmit()}
          value={values.password}
          placeholder="Nhập mật khẩu"
          type={showPass ? "text" : "password"}
          leftIcon={<Icon icon="ph:lock-simple" fontSize={24} />}
          className="text-txtprimary"
          rightIcon={
            <Icon
              icon={showPass ? "ph:eye-closed" : "ph:eye"}
              fontSize={24}
              onClick={() => onShowPass(!showPass)}
            />
          }
        />
        {errors.password && (
          <span className="text-xs font-medium text-red-primary">
            {errors.password}
          </span>
        )}
      </div>
      <ButtonSubmitPrimary
        isLoading={load}
        disabled={load}
        onClickHandle={() => handleSubmit()}
      >
        Đăng nhập
      </ButtonSubmitPrimary>
    </>
  );
};

export default SigninForm;
