"use client";
import {
  IdCardCheck,
  IdCardScan,
  IdentifyCardBack,
  IdentifyCardFront,
} from "@/assets/images";
import {
  ButtonLabel,
  ButtonSubmitPrimary,
} from "@/components/base-components/buttons";
import TextInput from "@/components/base-components/input/text-input";
import {toastNVB} from "@/components/base-components/toast";
import {Icon} from "@/components/common-components";
import BackTo from "@/components/particals/back-to";
import {useFormValidator} from "@/hooks/validators";
import {RootState} from "@/stores";
import {setIdCard, setKycModalAuthorized} from "@/stores/kyc-slice";
import {translate} from "@/utilities/translator";
import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Calendar from "@/components/base-components/input/date-input";
import {RadioCheck} from "@/components/base-components/radios";

export const KycScan = () => {
  const {idCard} = useSelector((state: RootState) => state.kyc);
  const dispatch = useDispatch();

  const handlCardImageChange = (
    type: "front" | "back",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        toastNVB({
          type: "error",
          msg: "Invalid file type. Please select a PNG or JPG image.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () =>
        type === "front"
          ? dispatch(setIdCard({...idCard, front: reader.result as string}))
          : type === "back"
            ? dispatch(setIdCard({...idCard, back: reader.result as string}))
            : toastNVB({type: "error", msg: "Image loading failed"});
      reader.readAsDataURL(file);
    } else {
      toastNVB({type: "error", msg: "Please select a valid image file."});
    }
  };

  function handleNavigate(arg0: string): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="flex flex-col items-center w-full rounded-lg bg-white gap-8 p-4">
        <div className="flex flex-col w-full max-w-[245px] max-auto">
          <span className="font-bold text-lg text-txtprimary text-center">
            {translate("identify_with_your_identity_card")}
          </span>
          <span className="font-medium text-sm text-txtfifth text-center">
            {translate(
              "take_or_upload_your_identity_card_to_perform_authentication"
            )}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-auto">
          <div className="w-full flex flex-col gap-2">
            <img
              src={IdentifyCardFront.src}
              alt="id-card"
              className="border border-txtthird border-dashed rounded-lg w-full aspect-[1.528] h-auto"
            />
            <label
              htmlFor="idCardFront"
              className="flex items-center justify-center w-full cursor-pointer"
            >
              <ButtonLabel
                accept="image/png,image/jpg,image/jpeg"
                type="file"
                id="idCardFront"
                onChange={(e) => handlCardImageChange("front", e)}
                className="flex items-center gap-2"
              >
                <Icon icon="tabler:camera-plus" fontSize={24} />
                <span>{translate("front_side")}</span>
              </ButtonLabel>
              <input className="hidden" />
            </label>
          </div>
          <div className="w-full flex flex-col gap-2">
            <img
              src={IdentifyCardBack.src}
              alt="id-card"
              className="border border-txtthird border-dashed rounded-lg w-full aspect-[1.528] h-auto"
            />
            <label
              htmlFor="idCardBack"
              className="flex items-center justify-center w-full cursor-pointer"
            >
              <ButtonLabel
                type="file"
                id="idCardBack"
                accept="image/png,image/jpg,image/jpeg"
                onChange={(e) => handlCardImageChange("back", e)}
                className="flex items-center gap-2"
              >
                <Icon icon="tabler:camera-plus" fontSize={24} />
                <span>{translate("back_side")}</span>
              </ButtonLabel>
              <input
                type="file"
                id="idCardBack"
                onChange={(e) => handlCardImageChange("back", e)}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center w-full p-4 bg-txtthird/5 rounded-lg border border-dashed border-txtthird">
          <span className="font-semibold">
            {translate("note_when_authenticating")}
          </span>
          <div className="max-w-[288px] w-full grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-1 gap w-full h-auto">
              <img
                src={IdCardCheck.src}
                className="w-full h-auto aspect-[1.65]"
                alt="idcard-check"
              />
              <span className="text-txtsecondary text-sm text-center">
                {translate("use_main_identity_card")}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center gap w-full h-auto">
              <img
                src={IdCardScan.src}
                className="w-full h-auto aspect-[1.65]"
                alt="idcard-check"
              />
              <span className="text-txtsecondary text-sm text-center">
                {translate("use_main_identity_card")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const KycIdentifyInfo = () => {
  const dispatch = useDispatch();
  const {values, handleChange, validateAllFields, errors} = useFormValidator(
    {
      first_name: "",
      gender: "",
      dob: "",
      national_id: "",
      place_of_issue: "",
      date_issue: "",
      expired_date: "",
    },
    {
      first_name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        errorMessage:
          "Name must be at least 2 characters long and at most 50 characters long",
      },
      gender: {
        required: true,
        custom: (value: string): boolean => {
          return value === "male" || value === "female";
        },
        errorMessage: "Gender must be male or female",
      },
      dob: {required: true},
      national_id: {
        required: true,
        minLength: 12,
        maxLength: 13,
        errorMessage:
          "National ID must be at least 12 characters long and at most 13 characters long",
      },
      place_of_issue: {
        required: true,
        minLength: 2,
        maxLength: 50,
        errorMessage:
          "Place of issue must be at least 2 characters long and at most 50 characters long",
      },
      date_issue: {
        required: true,
        custom: (value: string): boolean => {
          const {expired_date} = values;
          if (!value || !expired_date) return false;
          const dateIssue = new Date(value);
          const expiredDate = new Date(expired_date);
          return dateIssue < expiredDate;
        },
        errorMessage: "Date of issue must be before the expired date",
      },
      expired_date: {
        required: true,
        custom: (value: string): boolean => {
          if (!value) return false;
          const today = new Date();
          const expiredDate = new Date(value);
          return expiredDate > today;
        },
        errorMessage: "Expired date must be in the future",
      },
    }
  );
  function handleNavigate(arg0: string): void {
    // throw new Error("Function not implemented.");
  }

  function handleSubmitForm(): void {
    dispatch(setKycModalAuthorized(true));
  }
  return (
    <>
      <BackTo>{translate("enter_information")}</BackTo>
      <div className="flex flex-col gap-3 w-full bg-white p-4 rounded-lg">
        <div className="flex flex-col gap-1 w-full">
          <span className="text-sm font-medium text-txtprimary">
            {translate("full_name")}
          </span>
          <TextInput
            className="h-10"
            onChange={(e) => handleChange("first_name", e.target.value)}
            value={values.first_name}
            placeholder={translate("enter_full_name")}
          />
          {errors.first_name && (
            <span className="text-xs font-medium text-red-primary">
              {errors.first_name}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="text-sm font-medium text-txtprimary">
            {translate("gender")}
          </span>
          <div className="flex items-center gap-3">
            <RadioCheck
              id={"gender-kyc"}
              name={"gender-kyc"}
              className="w-fit"
              isChecked={values.gender === "male"}
              handleEdit={() => handleChange("gender", "male")}
            >
              {translate("male")}
            </RadioCheck>
            <RadioCheck
              id={"gender-kyc"}
              name={"gender-kyc"}
              className="w-fit"
              isChecked={values.gender === "female"}
              handleEdit={() => handleChange("gender", "female")}
            >
              {translate("female")}
            </RadioCheck>
            {errors.gender != "" && (
              <span className="text-xs font-medium text-red-primary">
                {errors.gender}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("dob")}
          </span>
          <Calendar
            calendarClass="!w-full"
            wrapperCalendarClass="!w-full !max-w-none"
            mode="single"
            value={values.dob}
            onChange={(val) => {
              handleChange("dob", val);
            }}
          />
          {values.dob != "" && errors.dob && (
            <span className="text-xs font-medium text-red-primary">
              {errors.dob}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="text-sm font-medium text-txtprimary">
            {translate("identity_card_number")}
          </span>
          <TextInput
            className="h-10"
            onChange={(e) => handleChange("national_id", e.target.value)}
            value={values.national_id}
            placeholder={translate("enter_identity_card_number")}
          />
          {errors.national_id && (
            <span className="text-xs font-medium text-red-primary">
              {errors.national_id}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="text-sm font-medium text-txtprimary">
            {translate("place_of_issue")}
          </span>
          <TextInput
            className="h-10"
            onChange={(e) => handleChange("place_of_issue", e.target.value)}
            value={values.place_of_issue}
            placeholder={translate("enter_your_place_of_issue")}
          />
          {errors.place_of_issue && (
            <span className="text-xs font-medium text-red-primary">
              {errors.place_of_issue}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-txtfifth">
              {translate("date_of_issue")}
            </span>
            <Calendar
              calendarClass="!w-full"
              wrapperCalendarClass="!w-full !max-w-none"
              mode="single"
              value={values.date_issue}
              onChange={(val) => {
                handleChange("date_issue", val);
              }}
            />
            {values.date_issue != "" && errors.date_issue && (
              <span className="text-xs font-medium text-red-primary">
                {errors.date_issue}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-txtfifth">
              {translate("expire_date")}
            </span>
            <Calendar
              calendarClass="!w-full"
              wrapperCalendarClass="!w-full !max-w-none"
              mode="single"
              value={values.expired_date}
              onChange={(val) => {
                handleChange("expired_date", val);
              }}
            />
            {values.expired_date && errors.expired_date && (
              <span className="text-xs font-medium text-red-primary">
                {errors.expired_date}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-3 bg-white rounded-lg gap-1">
        <div className="flex flex-wrap text-center justify-center items-center gap-1.5 text-xs font-semibold text-txtsecondary">
          {translate("by_clicking_continue_i_agree_to")}{" "}
          <span
            className="text-txtthird cursor-pointer select-none"
            onClick={() => handleNavigate("/terms-of-agreement")}
          >
            {translate("terms_of_agreement")}
          </span>{" "}
          {translate("and")}
          <span
            className="text-txtthird cursor-pointer select-none"
            onClick={() => handleNavigate("/privacy-policy")}
          >
            {translate("and_privacy_policy")}
          </span>{" "}
          {translate("of_nvb_play")}
        </div>
        <ButtonSubmitPrimary
          className="disabled:!bg-black/5 disabled:!text-txtfifth"
          onClickHandle={() => handleSubmitForm()}
        >
          {translate("continue")}
        </ButtonSubmitPrimary>
      </div>
    </>
  );
};
