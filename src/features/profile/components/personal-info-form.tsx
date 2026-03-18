"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import Calendar from "@/components/base-components/input/date-input";
import TextInput from "@/components/base-components/input/text-input";
import {ToastSuccess} from "@/components/base-components/toast";
import {useMutationUpdateProfile} from "@/hooks/mutations/profile/use-update-profile";
import {REGEXS, useFormValidator} from "@/hooks/validators";
import {PersonalLayout} from "@/layouts/component-layouts";
import {cn} from "@/lib/utils";
import {getUserData, updateUserData} from "@/services/users";
import {RootState} from "@/stores";
import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const PersonalInfoForm = () => {
  const [allowUpdate, setAllowUpdate] = useState(false);
  const {updateFnc, isPending} = useMutationUpdateProfile();
  const {user} = useSelector((state: RootState) => state.users_data);
  const {
    values,
    setValues,
    errors,
    validateAllFields,
    validateAndSetErrors,
    handleChange,
  } = useFormValidator(
    {
      fullName: "",
      dateOfBirth: "",
      username: "",
      phoneNumber: "",
    },
    {
      fullName: {
        required: true,
        pattern: REGEXS.name,
      },
      dateOfBirth: {
        required: true,
      },
      username: {
        required: true,
        pattern: REGEXS.username,
      },
      phoneNumber: {
        required: true,
        pattern: REGEXS.phone,
      },
    }
  );

  useEffect(() => {
    if (user) {
      setValues({
        fullName: user?.first_name,
        dateOfBirth: user?.metadata?.dob,
        username: user?.metadata?.username,
        phoneNumber: user?.phone,
      });
    }
  }, [user]);

  useEffect(() => {
    if (
      validateAllFields() &&
      (user?.first_name != values.fullName ||
        user?.metadata?.dob != values.dateOfBirth ||
        user?.metadata?.username != values.username ||
        user?.phone != values.phoneNumber)
    ) {
      setAllowUpdate(true);
    } else {
      setAllowUpdate(false);
    }
  }, [values]);

  const handleSubmit = () => {
    validateAndSetErrors();
    if (validateAllFields()) {
      updateFnc({
        first_name: values.fullName,
        last_name: "",
        company_name: "",
        phone: values.phoneNumber,
        metadata: {
          dob: values.dateOfBirth,
          username: values.username,
        },
      });
      setAllowUpdate(false);
    }
  };

  return (
    <PersonalLayout>
      <span className="text-lg font-semibold text-txtprimary">
        Thông tin cá nhân
      </span>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">Họ và Tên</span>
          <TextInput
            className="!h-10"
            placeholder="Nhập tên người nhận"
            value={values.fullName}
            onChange={(e) => {
              handleChange("fullName", e.target.value);
            }}
          />
          {allowUpdate && errors.fullName && (
            <span className="text-xs font-medium text-red-primary">
              {errors.fullName}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">Ngày sinh</span>
          <Calendar
            calendarClass="!w-full"
            wrapperCalendarClass="!w-full !max-w-none"
            mode="single"
            value={values.dateOfBirth}
            onChange={(val) => {
              handleChange("dateOfBirth", val);
            }}
          />
          {allowUpdate && errors.dateOfBirth && (
            <span className="text-xs font-medium text-red-primary">
              {errors.dateOfBirth}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">Username</span>
          <TextInput
            type="text"
            className="!h-10"
            placeholder="Nhập Username"
            value={values.username}
            onChange={(e) => {
              handleChange("username", e.target.value);
            }}
          />
          {allowUpdate && errors.username && (
            <span className="text-xs font-medium text-red-primary">
              {errors.username}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            Số điện thoại
          </span>
          <TextInput
            className="!h-10"
            placeholder="Nhập số điện thoại"
            value={values.phoneNumber}
            onChange={(e) => {
              handleChange("phoneNumber", e.target.value);
            }}
          />
          {allowUpdate && errors.phoneNumber && (
            <span className="text-xs font-medium text-red-primary">
              {errors.phoneNumber}
            </span>
          )}
        </div>
      </div>
      <ButtonSubmitPrimary
        onClickHandle={() => handleSubmit()}
        isLoading={isPending}
        disabled={!allowUpdate}
        className={cn(
          "self-end !w-fit disabled:!bg-black/5 disabled:!text-black/15"
        )}
      >
        Cập nhật thông tin
      </ButtonSubmitPrimary>
    </PersonalLayout>
  );
};

export default PersonalInfoForm;
