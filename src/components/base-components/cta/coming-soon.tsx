"use client";
import {FbBlack, NVBPlayWhite, ShoppeBlack, TiktokBlack} from "@/assets/icons";
import {ComingSoonBg} from "@/assets/images";
import {translate} from "@/utilities/translator";
import React from "react";
import {ButtonSubmitPrimary} from "../buttons";

const ComingSoon = () => {
  return (
    <div className="relative animate-fade-up w-full flex items-center justify-center text-gray-third font-extrabold text-2xl rounded-lg overflow-hidden">
      <img
        src={ComingSoonBg.src}
        alt="bg-comming"
        className="relative z-[1] top-0 left-0 w-full h-full object-cover"
      />
      <div className="flex flex-col items-center w-full gap-8 p-3 max-w-[600px] absolute z-[2]">
        <div className="flex flex-col items-center gap-3">
          <img
            src={NVBPlayWhite.src}
            alt="nvbplay-logo-white"
            className="w-auto h-5 desktop:h-8 mx-auto"
          />
          <span className="text-[40px] desktop:text-[80px] leading-[72px] desktop:leading-[120px] mt-4 bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF00] bg-clip-text text-transparent">
            Coming Soon
          </span>
        </div>
        <div className="shadow-[inset_0_0_30px_rgba(255,255,255,0.2),0_10px_20px_0px_rgba(0,0,0,0.4)] border border-white/20 rounded-2xl flex flex-col items-center gap-8 p-4 max-w-[600px] w-full">
          <div className="flex flex-col gap-2 items-center max-w-[345px]">
            <span className="text-xl desktop:text-2xl text-white font-bold text-center">
              {translate("register_to_not_miss")}
            </span>
            <span className="text-sm font-bold text-center">
              {translate(
                "join_now_to_become_the_first_to_discover_and_receive_special_offers_from_us"
              )}
            </span>
          </div>
          <div className="flex items-center shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] border rounded-full h-12 max-w-[400px] w-full bg-transparent border-white/20 px-1">
            <input
              type="email"
              className="bg-transparent border-none outline-none text-white text-sm font-semibold w-full h-full px-4"
              placeholder={translate("please_enter_your_email")}
            />
            <ButtonSubmitPrimary className="h-10 w-[87px] rounded-full">
              {translate("sign_up")}
            </ButtonSubmitPrimary>
          </div>
          <div className="flex items-center gap-2">
            <img src={FbBlack.src} alt="sc-icon" className="h-10 w-10" />
            <img src={TiktokBlack.src} alt="sc-icon" className="h-10 w-10" />
            <img src={ShoppeBlack.src} alt="sc-icon" className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
