"use client";
import React from "react";
import {MembershipCardBanner, RankMember} from "@/assets/images";
import {Icon} from "@/components/common-components";
import {translate} from "@/utilities/translator";
import {IconBadge, MiniOutlineBtn} from "../elements";
import {bg_coin, coin, vector} from "@/assets/icons";
import {useRouter} from "next/navigation";

export const AccountAndOrder = () => {
  return (
    <div className="flex flex-col gap-3 w-full bg-white p-4">
      <span className="font-semibold">{translate("account_and_order")}</span>
      <div className="flex flex-col desktop:flex-row w-full gap-3 min-h-[343px] h-fit">
        <div className="grid grid-cols-1 w-full h-fit gap-3">
          <OrderAccount />
          <LoyaltyCard />
        </div>
        <MembershipCard />
      </div>
    </div>
  );
};

export const LoyaltyCard = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* CARD NVB */}
      <div className="relative rounded-lg overflow-hidden group bg-gradient-to-b from-[#1A1A1A] to-[#271D1D] cursor-pointer w-full aspect-[1.69375] flex flex-col justify-between">
        {/* Animated */}
        <div className="absolute z-[2] bg-gradient-to-r from-transparent top-0 -left-full group-hover:left-full transition-all duration-500 ease-linear h-full w-full group-hover:via-gray-100/15 dark:via-gray-100/10 to-transparent" />

        <img src={vector.src} className="absolute right-0 top-0 z-[1]" />
        <div className="flex flex-col gap-1 px-3 py-3 text-white">
          <p className="text-xs">{translate("nvb_play_wallet")}</p>
          <p className="text-sm font-semibold">0 đ</p>
        </div>
        <div className="min-h-8 z-[2] desktop:min-h-10 px-3 py-1 flex justify-between items-center text-white bg-gradient-to-r from-white/5 to-white/20">
          <div className="flex items-center text-xs gap-1">
            <Icon icon="fa6-solid:money-check-dollar" className="size-5" />
            {translate("deposit")}
          </div>
          <Icon icon="ph:caret-right" className="size-5" />
        </div>
      </div>
      {/* CARD LOYALTY*/}
      <div className="relative rounded-lg overflow-hidden group bg-[#C58D15] cursor-pointer w-full aspect-[1.69375] flex flex-col justify-between">
        {/* Animated */}
        <div className="absolute z-[2] bg-gradient-to-r from-transparent top-0 -left-full group-hover:left-full transition-all duration-500 ease-linear h-full w-full group-hover:via-gray-100/15 dark:via-gray-100/10 to-transparent" />
        <img
          src={bg_coin.src}
          className="absolute right-0 top-1 h-[calc(100%-3rem)] w-auto object-contain"
        />
        <div className="flex flex-col gap-1 px-3 py-3 text-white">
          <p className="text-xs">{translate("have")}</p>
          <p className="text-sm font-semibold">100.000.000</p>
        </div>
        <div className="min-h-8 z-[2] desktop:min-h-10 px-3 py-1 flex justify-between items-center text-white bg-gradient-to-r from-[#C58D15] to-[#E5BB48]">
          <div className="flex items-center text-xs gap-1">
            <img src={coin.src} />
            NVB Loyalty
          </div>
          <Icon icon="ph:caret-right" className="size-5" />
        </div>
      </div>
    </div>
  );
};

export const OrderAccount = ({data}: {data?: any}) => {
  const router = useRouter();
  function handleViewDetails(): void {
    router.push("/profile/order-management");
  }

  return (
    <div className="flex flex-col h-fit border-gray-border border rounded-lg p-4 gap-3">
      <div className="flex items-center justify-between">
        <div className="w-full flex items-center gap-2">
          <div className="rounded-full bg-gray-border h-10 w-10 flex items-center justify-center">
            <Icon icon="tabler:clipboard-list" fontSize={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{translate("your_orders")}</span>
            <span className="font-medium text-sm text-gray-icon">
              {translate("your_order_management")}
            </span>
          </div>
        </div>
        <MiniOutlineBtn onClick={() => handleViewDetails()}>
          {translate("view_details")}
        </MiniOutlineBtn>
      </div>
      <hr className="w-full h-[.0625rem] bg-gray-border" />
      <div className="w-full flex items-center gap-3 justify-between">
        <div className="flex flex-col gap-1 items-center w-full py-1.5">
          <IconBadge badgeClass="-right-1 -top-1" badgeNumber={2}>
            <Icon icon="tabler:report" fontSize={24} />
          </IconBadge>
          <span className="text-xs font-semibold text-txtfifth">
            {translate("wait_for_payment")}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-center w-full py-1.5">
          <IconBadge badgeClass="-right-1 -top-1" badgeNumber={2}>
            <Icon icon="tabler:truck-delivery" fontSize={24} />
          </IconBadge>
          <span className="text-xs font-semibold text-txtfifth">
            {translate("delinquent")}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-center w-full py-1.5">
          <IconBadge badgeClass="-right-1 -top-1" badgeNumber={2}>
            <Icon icon="tabler:checkup-list" fontSize={24} />
          </IconBadge>
          <span className="text-xs font-semibold text-txtfifth">
            {translate("delivered")}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-center w-full py-1.5">
          <IconBadge badgeClass="-right-1 -top-1" badgeNumber={2}>
            <Icon icon="tabler:star" fontSize={24} />
          </IconBadge>
          <span className="text-xs font-semibold text-txtfifth">
            {translate("evaluate")}
          </span>
        </div>
      </div>
    </div>
  );
};

const MembershipCard = () => {
  const router = useRouter();
  function handleViewDetails(): void {
    router.push("/subcription");
  }

  return (
    <div
      style={{
        background: `url(${MembershipCardBanner.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="min-w-[16.875rem] h-[21.4375rem] p-1 rounded-lg overflow-hidden"
    >
      <div className="flex flex-col justify-end h-full w-full">
        <div className="bg-white rounded-lg h-[10.5rem] p-4 flex w-full flex-col gap-[.625rem]">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary">
              {translate("nvb_play_members")}
            </span>
            <img
              src={RankMember.src}
              alt="img-rank-member"
              className="h-7 object-contain"
            />
          </div>
          <hr className="w-full h-[.0625rem] bg-gray-border" />
          <span className="text-sm font-medium">
            {translate("you_are_enjoying_monopoly_benefits_from_nvb_members")}
          </span>
          <MiniOutlineBtn onClick={() => handleViewDetails()}>
            {translate("view_details")}
          </MiniOutlineBtn>
        </div>
      </div>
    </div>
  );
};
