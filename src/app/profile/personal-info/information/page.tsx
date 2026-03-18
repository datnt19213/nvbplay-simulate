"use client";
import {ThreeDotsFill, Zalo} from "@/assets/icons";
import {BgBanner, Facebook, MembershipMedal, Tele} from "@/assets/images";
import BadgeIndicator from "@/components/base-components/badge-indicator";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import Image from "@/components/base-components/images/image";
import {RootState} from "@/stores";
import {setUpdateInfomationModal} from "@/stores/profile";
import {CapitalizeFirstLetter, GetStr, MaskString} from "@/utilities/text";
import {translate} from "@/utilities/translator";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

const Information = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.users_data);
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3 animate-fade-up animate-delay-200">
        <div className="flex flex-col gap-4 bg-white rounded-lg p-4 w-full">
          <div className="flex justify-between items-center w-full font-semibold">
            <span className="text-txtfifth">
              {translate("personal_information")}
            </span>
            <span
              className="text-sm text-txtthird cursor-pointer"
              onClick={() => dispatch(setUpdateInfomationModal(true))}
            >
              {translate("change")}
            </span>
          </div>
          <div className="text-sm flex flex-col">
            <span className="font-medium text-txtsecondary">
              {translate("full_name")}
            </span>
            <span className="font-semibold text-txtfifth">
              {user?.first_name || "-"}{" "}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="text-sm flex flex-col">
              <span className="font-medium text-txtsecondary">
                {translate("username")}
              </span>
              <span className="font-semibold text-txtfifth">
                {user?.metadata?.username || "-"}
              </span>
            </div>
            <div className="text-sm flex flex-col min-w-[7.5rem]">
              <span className="font-medium text-txtsecondary">
                {translate("phone_number")}
              </span>
              <span className="font-semibold text-txtfifth">
                {user?.phone
                  ? "********" + GetStr({str: user?.phone, start: 8, length: 2})
                  : "-"}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm flex flex-col">
              <span className="font-medium text-txtsecondary">
                {translate("dob")}
              </span>
              <span className="font-semibold text-txtfifth">
                {user?.metadata?.dob}
              </span>
            </div>
            <div className="text-sm flex flex-col min-w-[7.5rem]">
              <span className="font-medium text-txtsecondary">
                {translate("gender")}
              </span>
              <span className="font-semibold text-txtfifth">
                {user?.metadata?.gender
                  ? CapitalizeFirstLetter(user?.metadata?.gender)
                  : "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
          <div className="desktop:col-span-1 col-span-2 bg-white rounded-lg p-4 flex flex-col justify-between w-full">
            <div className="font-semibold text-txtfifth">
              {translate("email_address")}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-txtfifth">
                {user?.email}
              </span>
              <BadgeIndicator text={translate("verified")} />
            </div>
          </div>
          <div className="desktop:col-span-1 col-span-2 bg-white rounded-lg p-4 flex flex-col justify-between w-full">
            <div className="font-semibold flex justify-between items-center text-txtfifth">
              {translate("password")}
              {/* <span className="text-sm text-txtthird cursor-pointer">
                {translate("update")}
              </span> */}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-txtsecondary">
                {translate("last_updated")}
              </span>
              <span className="text-sm font-medium text-txtsecondary">
                6 {translate("months")} {translate("ago")}
              </span>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-lg p-4 flex justify-between w-full">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-txtfifth">
                {translate("linked_account")}
              </span>
              <span className="font-medium text-sm text-txtsecondary">
                3 {translate("foundation")} {translate("linking")}
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex">
                <Image
                  src={Facebook.src}
                  classNameImage="object-cover h-full w-auto"
                  className="h-9 w-9 rounded-full border border-white overflow-hidden"
                />
                <Image
                  src={Zalo.src}
                  classNameImage="object-cover h-full w-auto"
                  className="h-9 w-9 rounded-full border border-white overflow-hidden -ml-3"
                />
                <Image
                  src={Tele.src}
                  classNameImage="object-cover h-full w-auto"
                  className="h-9 w-9 rounded-full border border-white overflow-hidden -ml-3"
                />
              </div>
              <img
                src={ThreeDotsFill.src}
                alt="icon-more"
                className="h-3 w-auto object-contain cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          background: `url(${BgBanner.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full min-h-[10rem] rounded-lg flex flex-col gap-3 desktop:gap-0 desktop:flex-row desktop:items-center justify-between desktop:p-6 p-3 pt-0 desktop:pt-6 desktop:pl-0"
      >
        <div className="flex flex-col desktop:flex-row desktop:items-center">
          <img
            src={MembershipMedal.src}
            alt="img_banner"
            className="h-[10rem] w-[10rem] aspect-square"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-white">
              {translate("you_are_enjoying_monopoly_benefits_from_nvb_members")}
            </span>
            <span className="textsm font-medium text-gray-eighth">
              {translate("date_expired")}: 01/01/1900
            </span>
          </div>
        </div>
        <ButtonSubmitPrimary className="w-fit">
          {translate("view_details")}
        </ButtonSubmitPrimary>
      </div>
    </div>
  );
};

export default Information;
