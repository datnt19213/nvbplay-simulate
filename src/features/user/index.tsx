"use client";
import {MiniPixel, RankMember, SlashSun, StarMedal} from "@/assets/images";
import Gavatar from "@/components/base-components/avartar";
import {LoadSlashBar} from "@/components/base-components/cta/load-slash-bar";
import {RootState} from "@/stores";
import {GetBgColorFromFirstVowel} from "@/utilities/text-to-color";
import {translate} from "@/utilities/translator";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  LoyaltyCard,
  OrderAccount,
} from "../profile-overview/components/account-and-order";
import {useRouter} from "next/navigation";
import BuilderEquipment from "./components/builder-equipment";
import AccountAndLinker from "./components/account-and-linker";
import SupportCustomer from "./components/support-customer";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {setSignOutModal} from "@/stores/profile";

export const UserHeader = () => {
  const {user} = useSelector((state: RootState) => state.users_data);
  return (
    <div className="min-h-[148px] w-full flex flex-col gap-3 bg-gradient-to-bl from-[#FEF2E8] to-[#FFE8CF] p-4 relative z-[1]">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 w-full">
          {(user?.metadata?.avatar && user?.metadata?.avatar !== "" && (
            <img
              src={user?.metadata?.avatar}
              alt="avatar"
              className="h-[52px] w-[52px] rounded-full"
            />
          )) || (
            <Gavatar
              backgroundColor={GetBgColorFromFirstVowel(
                (user?.first_name && user?.first_name) || "A"
              )}
              rounded
              className="!size-10 desktop:hidden"
            >
              {(user?.first_name && user?.first_name?.[0]) || "A"}
            </Gavatar>
          )}
          <div className="flex flex-col w-full">
            <span className="font-semibold text-lg text-txtprimary truncate">
              {user?.first_name || "-"}
            </span>
            <span className="text-sm font-medium">
              ID: {user?.metadata?.username || "-"}
            </span>
          </div>
        </div>
        <img
          src={RankMember.src}
          alt="rank-memember"
          className="min-w-[58px] h-[32px]"
        />
      </div>
      <div className="w-full h-14 relative rounded-t-lg bg-gradient-to-r from-[#FFAC52] to-[#FF3F1A] overflow-hidden">
        <img
          src={MiniPixel.src}
          alt="mini-pixel"
          className="absolute h-full w-auto right-0 z-[1]"
        />
        <div className="flex items-center justify-between py-2 px-3 relative z-[2]">
          <div className="w-full flex items-center gap-4">
            <div className="flex items-center relative">
              <img
                src={SlashSun.src}
                alt="slash-sun"
                className="w-10 h-10 z-[1]"
              />
              <span className="absolute -top-0.5 -right-2 z-[2] flex items-center justify-center rounded-full px-1 h-5 text-[10px] font-bold bg-[#FFF5C7] text-[#B26500]">
                +2%
              </span>
            </div>
            <div className="flex flex-col max-w-[156px]">
              <div className="flex items-center">
                <span className="font-bold text-white">
                  {translate("lvl")}&nbsp;2
                </span>
                <hr className="h-4 w-[1px] mx-2 bg-gray-border" />
                <div className="text-xs">
                  {translate("sold")}&nbsp;
                  <span className=" text-white font-semibold">200K</span>
                </div>
              </div>
              <div className="w-full flex items-center relative">
                <LoadSlashBar
                  className="rounded-full"
                  containerClass="bg-txtfifth h-1 w-full bg-white/50 z-[2] relative"
                  slashColors={{primary: "#9b2913", secondary: "#b75e4d"}}
                  value={50}
                  slashWidth={50}
                  elementClass="justify-end"
                />
                <img
                  src={StarMedal.src}
                  alt="star-medal"
                  className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 z-[2]"
                />
              </div>
            </div>
          </div>
          <span className="min-w-[66px] h-[28px] bg-white rounded-full flex items-center justify-center text-xs font-semibold text-txtthird">
            {translate("details")}
          </span>
        </div>
      </div>
    </div>
  );
};

export const UserDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="relative z-[2] -mt-4 p-2 rounded-2xl bg-gray-primary flex flex-col gap-2 w-full">
      <OrderAccount />
      <LoyaltyCard />
      <AccountAndLinker />
      <BuilderEquipment />
      <SupportCustomer />
      <ButtonSubmitPrimary
        className="bg-[#FF424E]"
        onClick={() => dispatch(setSignOutModal(true))}
      >
        {translate("sign_out")}
      </ButtonSubmitPrimary>
    </div>
  );
};
