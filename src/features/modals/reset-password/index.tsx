"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import TextInput from "@/components/base-components/input/text-input";
import Modal from "@/components/base-components/modal";
import {toastNVB} from "@/components/base-components/toast";
import {useWindowSize} from "@/hooks";
import {useProfileResetPasswordMutation} from "@/hooks/mutations/profile/use-reset-password";
import {useFormValidator} from "@/hooks/validators";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setResetPasswordModal} from "@/stores/profile";
import {GetACookie} from "@/utilities/cookies";
import {translate} from "@/utilities/translator";
import {verifyUser} from "@/utilities/verify";
import {redirect} from "next/navigation";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

const ResetPasswordModal = () => {
  const [width, height] = useWindowSize();
  const {resetPasswordModal} = useSelector((state: RootState) => state.profile);
  const {resetPassword, isPending, isSuccess} =
    useProfileResetPasswordMutation();
  const {user} = useSelector((state: RootState) => state.users_data);
  const {values, handleChange, validateAllFields, resetForm} = useFormValidator(
    {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    {
      oldPassword: {
        required: true,
        minLength: 8,
      },
      password: {
        required: true,
        minLength: 8,
      },
      confirmPassword: {
        required: true,
        minLength: 8,
        custom: (value: string): boolean => value === values.password,
      },
    }
  );
  const dispatch = useDispatch();
  function handleSubmit(): void {
    if (verifyUser()) {
      toastNVB({
        type: "error",
        msg: translate("user_not_found_please_signin_first"),
      });
      redirect("/auth");
    }
    if (validateAllFields()) {
      resetPassword(user?.emnail, values.password, values.oldPassword);
      resetForm();
    } else {
      alert(translate("please_enter_valid_all_fields"));
    }
  }

  return (
    <Modal
      wrapperClass="z-[49]"
      size={width < 1200 ? "full" : "xs"}
      verticalPos={width < 1200 ? "bottom" : "center"}
      title={translate("password")}
      titleClass="text-txtprimary font-semibold text-center"
      open={resetPasswordModal}
      bodyClass="flex flex-col gap-3"
      onClose={() => dispatch(setResetPasswordModal(false))}
      submitButton={
        <ButtonSubmitPrimary
          onClickHandle={() => handleSubmit()}
          isLoading={isPending}
          className={cn(" disabled:!bg-black/5 disabled:!text-black/15")}
        >
          {translate("completed")}
        </ButtonSubmitPrimary>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("old_password")}
          </span>
          <TextInput
            type="text"
            className="!h-10 bg-gray-primary "
            placeholder={translate("enter_old_password")}
            onChange={(e) => handleChange("oldPassword", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("new_password")}
          </span>
          <TextInput
            type="text"
            className="!h-10 bg-gray-primary "
            placeholder={translate("enter_new_password")}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("confirm_new_password")}
          </span>
          <TextInput
            type="text"
            className="!h-10 bg-gray-primary "
            placeholder={translate("confirm_new_password")}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
