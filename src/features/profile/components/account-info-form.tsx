"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import TextInput from "@/components/base-components/input/text-input";
import {REGEXS, useFormValidator} from "@/hooks/validators";
import {PersonalLayout} from "@/layouts/component-layouts";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import React from "react";
import {useSelector} from "react-redux";

const AccountInfoForm = () => {
  const {user} = useSelector((state: RootState) => state.users_data);
  console.log(user);

  const {values} = useFormValidator(
    {
      email: user?.email || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    {
      email: {
        required: true,
        pattern: REGEXS.email,
      },
      oldPassword: {
        required: true,
        minLength: 8,
        pattern: REGEXS.password,
      },
      newPassword: {
        required: true,
        minLength: 8,
        pattern: REGEXS.password,
      },
      confirmPassword: {
        required: true,
        minLength: 8,
        pattern: REGEXS.password,
      },
    }
  );
  return (
    <PersonalLayout>
      <span className="text-lg font-semibold text-txtprimary">Tài khoản</span>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">Email</span>
          <TextInput
            type="email"
            className="!h-10 bg-gray-primary cursor-not-allowed select-none pointer-events-none"
            placeholder={values.email ? values.email : "usermail@gmail.com"}
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">Mật khẩu cũ</span>
          <TextInput
            type="password"
            className="!h-10"
            placeholder="Nhập mật khẩu cũ"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            Nhập mật khẩu mới
          </span>
          <TextInput className="!h-10" placeholder="Nhập mật khẩu mới" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            Nhập lại mật khẩu mới
          </span>
          <TextInput className="!h-10" placeholder="Nhập lại mật khẩu mới" />
        </div>
      </div>
      <ButtonSubmitPrimary
        disabled
        className={cn(
          "self-end !w-fit disabled:!bg-black/5 disabled:!text-black/15"
        )}
      >
        Lưu thay đổi
      </ButtonSubmitPrimary>
    </PersonalLayout>
  );
};

export default AccountInfoForm;
