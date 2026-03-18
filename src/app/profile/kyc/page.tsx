"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {KycIdentifyInfo, KycScan} from "@/features/kyc";
import {RootState} from "@/stores";
import {translate} from "@/utilities/translator";
import React from "react";
import {useSelector} from "react-redux";

const KYC = () => {
  const {idCard} = useSelector((state: RootState) => state.kyc);
  function handleNavigate(arg0: string): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <div className="w-full max-w-[640px] flex flex-col gap-8 mx-auto">
      <KycScan />
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
          disabled={!(idCard.back && idCard.front)}
          className="disabled:!bg-black/5 disabled:!text-txtfifth"
          onClickHandle={() => handleNavigate("/profile/kyc/identify-info")}
        >
          {translate("continue")}
        </ButtonSubmitPrimary>
      </div>
    </div>
  );
};

export default KYC;
