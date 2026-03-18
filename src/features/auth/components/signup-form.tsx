import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import TextInput from "@/components/base-components/input/text-input";
import {Icon} from "@/components/common-components";
import {REGEXS, useFormValidator} from "@/hooks/validators";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setSignupFormData} from "@/stores/auth";
import {redirect, RedirectType} from "next/navigation";
import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
type SignupFormProps = {
  handleSubmitSignup: (data?: any) => void;
  onShowPass: (show: boolean) => void;
  showPass: boolean;
};
const SignupForm: FC<SignupFormProps> = ({
  handleSubmitSignup,
  onShowPass,
  showPass,
}) => {
  const dispatch = useDispatch();
  const {isSubmitSignup} = useSelector((state: RootState) => state.auth);
  const {values, errors, handleChange, validateAllFields, resetForm} =
    useFormValidator(
      {
        email: "",
        password: "",
        fullName: "",
        phone: "",
      },
      {
        email: {
          required: true,
          pattern: REGEXS.email,
          errorMessage: "Vui lòng nhập email hợp lệ",
        },
        password: {
          required: true,
          minLength: 8,
          pattern: REGEXS.password,
          errorMessage:
            "Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất một chữ hoa, một chữ cái viết thường, một số và một ký tự đặc biệt",
        },
        fullName: {
          required: true,
          pattern: REGEXS.name,
          errorMessage: "Vui lòng nhập tên đầy đủ hợp lệ",
        },
        phone: {
          required: true,
          pattern: REGEXS.phone,
          errorMessage: "Vui lòng nhập số điện thoại hợp lệ",
        },
      }
    );

  function handleSubmit() {
    if (validateAllFields()) {
      try {
        handleSubmitSignup(values);
        dispatch(setSignupFormData("signin"));
        resetForm();
      } catch (error) {
        // console.error("Đăng ký thất bại:", error); // Xử lý lỗi nếu cần
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <span className="text-sm font-medium text-txtprimary">Họ tên</span>
        <TextInput
          onChange={(e) => handleChange("fullName", e.target.value)}
          value={values.fullName}
          placeholder="Họ tên"
          leftIcon={
            <Icon icon="ph:user" fontSize={24} className="text-txtprimary" />
          }
        />
        {errors.fullName && (
          <span className="text-xs font-medium text-red-primary">
            {errors.fullName}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 w-full">
        <span className="text-sm font-medium text-txtprimary">
          Số điện thoại
        </span>
        <TextInput
          onChange={(e) => handleChange("phone", e.target.value)}
          value={values.phone}
          placeholder="Số điện thoại"
          leftIcon={
            <Icon icon="ph:phone" fontSize={24} className="text-txtprimary" />
          }
        />
        {errors.phone && (
          <span className="text-xs font-medium text-red-primary">
            {errors.phone}
          </span>
        )}
      </div>
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
        disabled={isSubmitSignup}
        className={cn(
          isSubmitSignup
            ? "pointer-events-none select-none"
            : "pointer-events-auto select-auto"
        )}
        onClickHandle={() => handleSubmit()}
      >
        Đăng ký
      </ButtonSubmitPrimary>
    </>
  );
};

export default SignupForm;
