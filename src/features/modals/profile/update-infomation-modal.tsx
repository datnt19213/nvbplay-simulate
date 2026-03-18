"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import Calendar from "@/components/base-components/input/date-input";
import TextInput from "@/components/base-components/input/text-input";
import Modal from "@/components/base-components/modal";
import {RadioCheck} from "@/components/base-components/radios";
import {useWindowSize} from "@/hooks";
import {useMutationUpdateProfile} from "@/hooks/mutations/profile/use-update-profile";
import {REGEXS, useFormValidator} from "@/hooks/validators";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setUpdateInfomationModal} from "@/stores/profile";
import {translate} from "@/utilities/translator";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const UpdateInfomationModal = () => {
  const {updateFnc, isPending} = useMutationUpdateProfile();
  const {user} = useSelector((state: RootState) => state.users_data);
  const {updateInformationModal} = useSelector(
    (state: RootState) => state.profile
  );
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();
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
      gender: "male",
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
      gender: {
        required: true,
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
        gender: user?.metadata?.gender,
      });
    }
  }, [user]);

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
          gender: values.gender,
          avatar: "",
        },
      });
      dispatch(setUpdateInfomationModal(false));
    }
  };
  return (
    <Modal
      wrapperClass="z-[49]"
      size={width < 1200 ? "full" : "xs"}
      verticalPos={width < 1200 ? "bottom" : "center"}
      title={translate("personal_information")}
      titleClass="text-txtprimary font-semibold text-center"
      open={updateInformationModal}
      bodyClass="flex flex-col gap-3"
      onClose={() => dispatch(setUpdateInfomationModal(false))}
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
          <span className="text-sm font-medium text-txtprimary">
            {translate("full_name")}
          </span>
          <TextInput
            className="!h-10 bg-gray-primary"
            placeholder={translate("enter_full_name")}
            value={values.fullName}
            onChange={(e) => {
              handleChange("fullName", e.target.value);
            }}
          />
          {errors.fullName && (
            <span className="text-xs font-medium text-red-primary">
              {errors.fullName}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtprimary">
            {translate("dob")}
          </span>
          <Calendar
            className="bg-gray-primary hover:bg-gray-primary"
            calendarClass="!w-full bg-gray-primary !z-50"
            wrapperCalendarClass="!w-full !max-w-none !z-50"
            mode="single"
            value={values.dateOfBirth}
            onChange={(val) => {
              handleChange("dateOfBirth", val);
            }}
          />
          {errors.dateOfBirth && (
            <span className="text-xs font-medium text-red-primary">
              {errors.dateOfBirth}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtprimary">
            {translate("username")}
          </span>
          <TextInput
            type="text"
            className="!h-10 bg-gray-primary"
            placeholder={translate("enter_username")}
            value={values.username}
            onChange={(e) => {
              handleChange("username", e.target.value);
            }}
          />
          {errors.username && (
            <span className="text-xs font-medium text-red-primary">
              {errors.username}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtprimary">
            {translate("phone_number")}
          </span>
          <TextInput
            className="!h-10 bg-gray-primary"
            placeholder={translate("enter_phone_number")}
            value={values.phoneNumber}
            onChange={(e) => {
              handleChange("phoneNumber", e.target.value);
            }}
          />
          {errors.phoneNumber && (
            <span className="text-xs font-medium text-red-primary">
              {errors.phoneNumber}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtprimary">
            {translate("gender")}
          </span>
          <div className="flex items-center gap-4">
            <RadioCheck
              className="max-w-20"
              id={"male-rd"}
              name={"gender-rd"}
              isChecked={values.gender === "male"}
              onChange={() => handleChange("gender", "male")}
            >
              {translate("male")}
            </RadioCheck>
            <RadioCheck
              className="max-w-20"
              id={"female-rd"}
              name={"gender-rd"}
              isChecked={values.gender === "female"}
              onChange={() => handleChange("gender", "female")}
            >
              {translate("female")}
            </RadioCheck>
            <RadioCheck
              className="max-w-20"
              id={"other-rd"}
              name={"gender-rd"}
              isChecked={values.gender === "other"}
              onChange={() => handleChange("gender", "other")}
            >
              {translate("other")}
            </RadioCheck>
          </div>
          {errors.phoneNumber && (
            <span className="text-xs font-medium text-red-primary">
              {errors.phoneNumber}
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UpdateInfomationModal;
