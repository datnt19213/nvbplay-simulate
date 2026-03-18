"use client";
import {BookmarkFill, ConnectFill, TicketFill, UserFill} from "@/assets/icons";
import BadgeIndicator from "@/components/base-components/badge-indicator";
import {Icon} from "@/components/common-components";
import {MiniOutlineBtn} from "@/features/profile-overview/elements";
import {translate} from "@/utilities/translator";
import {useRouter} from "next/navigation";
import React from "react";
import {ButtonCard} from "../elements";

const AccountAndLinker = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 max-h-[184px] w-full gap-2">
      <div className="py-4 px-3 flex flex-col justify-between bg-white rounded-lg">
        <div className="flex items-center gap-2 justify-between">
          <img
            src={UserFill.src}
            alt="user-fill"
            className="h-8 w-8 aspect-square rounded-full"
          />
          <BadgeIndicator text={translate("verified")} />
        </div>
        <div className="flex flex-col w-full gap-3">
          <div className="w-full">
            <span className="text-sm font-semibold text-txtfifth">
              {translate("account")}
            </span>
            <span className="font-medium text-xs text-gray-icon">
              {translate("information_management_and_your_account_protection")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center relative">
              <div className="rounded-full border p-1.5 border-white flex items-center justify-center bg-gray-primary">
                <Icon icon="tabler:notebook" fontSize={16} />
              </div>
              <div className="rounded-full -ml-3 p-1.5 border border-white flex items-center justify-center bg-gray-primary">
                <Icon icon="tabler:shield-lock" fontSize={16} />
              </div>
              <div className="rounded-full -ml-3 p-1.5 border border-white  flex items-center justify-center bg-gray-primary">
                <Icon icon="tabler:file-invoice" fontSize={16} />
              </div>
            </div>
            <MiniOutlineBtn
              onClick={() => router.push("/profile/personal-info/information")}
            >
              {translate("details")}
            </MiniOutlineBtn>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <ButtonCard
          icon={<img src={TicketFill.src} className="h-[32px] w-[32px]" />}
          label={translate("voucher_wallet")}
          onClick={() => router.push("/profile/wallet-vouchers")}
        />
        <ButtonCard
          icon={<img src={BookmarkFill.src} className="h-[32px] w-[32px]" />}
          label={translate("saved")}
        />
        <ButtonCard
          icon={<img src={ConnectFill.src} className="h-[32px] w-[32px]" />}
          label={translate("affiliate_nvb")}
          onClick={() => router.push("/profile/affiliate")}
        />
      </div>
    </div>
  );
};

export default AccountAndLinker;
