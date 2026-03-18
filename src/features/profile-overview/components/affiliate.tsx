"use client";
import {coin, NVBLogoBlackWhite} from "@/assets/icons";
import {
  AffiliateBlendBg,
  Circle,
  Facebook,
  FacebookBW,
  FlagLevel,
  LogoSun,
  Pixels,
  Zalo,
  ZaloBW,
} from "@/assets/images";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {toastNVB} from "@/components/base-components/toast";
import {Icon} from "@/components/common-components";
import {translate} from "@/utilities/translator";
import React, {useEffect, useState} from "react";
import {MiniOutlineBtn} from "../elements";
import {dateFormator} from "@/utilities/date";
import {LoadSlashBar} from "@/components/base-components/cta/load-slash-bar";
import {ProgressCircle} from "@/components/base-components/progress";
import {COMMON_DATA} from "@/configs";
import {Statistics} from "./statistic";

export const Affiliate = () => {
  return (
    <div className="flex flex-col gap-3 w-full bg-white p-4">
      <span className="font-semibold">{translate("affiliate_nvb_play")}</span>
      <IntroduceLinkInfo />
      <ParametersPortfolio />
      <Statistics />
    </div>
  );
};

export const ParametersPortfolio = () => {
  const [currentDate, setCurrentDate] = useState<{
    day: string;
    month: string;
    year: string;
  }>({
    day: "01",
    month: "01",
    year: "2023",
  });

  useEffect(() => {
    const now = new Date();
    setCurrentDate({
      day: dateFormator(now, "dd"),
      month: dateFormator(now, "mm"),
      year: dateFormator(now, "yyyy"),
    });
  }, []);
  function handleDetailIncome(): void {
    // throw new Error("Function not implemented.");
  }

  function handleDetailWithdraw(): void {
    // throw new Error("Function not implemented.");
  }
  function handleDetailWithdrawHistory(): void {
    // throw new Error("Function not implemented.");
  }

  function handleDetailClaimCoin(): void {
    // throw new Error("Function not implemented.");
  }

  function handleDetailOfLevel(): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <div className="flex min-h-[17.625rem] flex-col desktop:flex-row gap-3">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full border border-gray-border rounded-lg bg-gray-seventh/5 p-4 min-h-[199px] flex flex-col justify-between">
          <div className="flex justify-between w-full">
            <img
              src={NVBLogoBlackWhite.src}
              alt="img-nvb-logo"
              className="h-4 w-auto"
            />
            <MiniOutlineBtn
              className="w-fit h-[2rem] text-sm font-semibold"
              onClick={() => handleDetailIncome()}
            >
              {translate("details")}
            </MiniOutlineBtn>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-txtfifth">
              {translate("income_from_discount")}
            </span>
            <span className="text-xl font-bold text-txtthird">20.000.000đ</span>
          </div>
          <div className="flex gap-3">
            <ButtonSubmitPrimary
              className="rounded-full"
              onClickHandle={() => handleDetailWithdraw()}
            >
              {translate("withdraw_money")}
            </ButtonSubmitPrimary>
            <ButtonSubmitPrimary
              className="bg-gray-border rounded-full hover:bg-gray-border text-txtfifth"
              onClickHandle={() => handleDetailWithdrawHistory()}
            >
              {translate("withdraw_money")}
            </ButtonSubmitPrimary>
          </div>
        </div>
        {/* Income & claim */}
        <div className="w-full flex items-center overflow-hidden rounded-lg h-[4.375rem] py-2 bg-gradient-to-b from-[#000400] to-[#261512] relative">
          <img
            src={Pixels.src}
            alt="pixels-bg"
            className="absolute z-[1] top-0 left-0 w-full object-contain opacity-[0.08]"
          />
          <div className="flex relative z-[2] justify-between items-center px-4 w-full">
            <div className="flex items-center gap-2">
              <div className="h-10 min-w-10 rounded-full overflow-hidden bg-gradient-to-b from-[#291B19] to-[#B52B11] border border-[#8C584D] flex items-center justify-center">
                <img src={LogoSun.src} alt="img-sun" className="w-6 h-6" />
              </div>
              <div className="flex flex-col h-12 w-full">
                <div className="font-medium text-sm text-white flex items-center">
                  {translate("rewards")}{" "}
                  <span className="w-[3.125rem] h-5 rounded-full bg-[#FFF5C7 flex items-center justify-center">
                    +1%
                  </span>
                </div>
                <div className="flex items-center gap-1 text-orange-primary text-lg font-bold">
                  <img
                    src={coin.src}
                    alt="coin-img"
                    className="w-[1.125rem] h-[1.125rem]"
                  />
                  200
                </div>
              </div>
            </div>
            <ButtonSubmitPrimary
              className="bg-white hover:bg-white rounded-full h-10 w-fit min-w-[6.25rem] flex items-center justify-center text-txtthird"
              onClickHandle={() => handleDetailClaimCoin()}
            >
              {translate("claim")}
            </ButtonSubmitPrimary>
          </div>
        </div>
      </div>
      {/* part right */}
      <div className="flex w-full justify-center gap-3">
        {/* Level panel */}
        <div className="relative rounded-lg overflow-hidden w-full max-w-[21.125rem] bg-gradient-to-b from-[#772413] to-[#110503] border border-gray-primary">
          <img
            src={Circle.src}
            alt="circle_img"
            className="absolute z-[1] h-full object-contain right-0 bottom-0"
          />
          <div className="flex flex-col gap-3 p-4 relative z-[2]">
            <div className="flex w-full justify-between items-center ">
              <span className="font-semibold text-white">
                {translate("levels")}
              </span>
              <MiniOutlineBtn
                className="w-fit text-sm font-semibold border-none h-8 rounded-full bg-white/20 text-white px-4 flex items-center justify-center"
                onClick={() => handleDetailOfLevel()}
              >
                {translate("details")}
              </MiniOutlineBtn>
            </div>
            <div className="flex w-full flex-col desktop:flex-row items-center justify-center gap-3">
              <div
                style={{
                  background: `url(${FlagLevel.src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
                className="flex relative flex-col gap-2 min-w-[132px] h-[192px]"
              >
                <span className="absolute top-5 right-3 z-[2] text-[6px] text-white font-bold">
                  {currentDate?.year}
                </span>
                <span className="absolute z-[2] text-nowrap top-1/2  left-1/2 -translate-x-1/2 text-[19px] font-bold text-white">
                  {translate("lvl")} 1
                </span>
                <div className="absolute px-2 w-full top-2/3 left-1/2 -translate-x-1/2 flex items-center justify-between uppercase font-bold text-white">
                  <div className="flex w-full flex-col justify-center items-center ">
                    <span className="opacity-30 text-[6px]">
                      {translate("commission")}
                    </span>
                    <span className="text-xs leading-[18px]">10%</span>
                  </div>
                  <div className="flex w-full flex-col justify-center items-center ">
                    <span className="opacity-30 text-[6px]">
                      {translate("rewards")}
                    </span>
                    <span className="text-xs leading-[18px]">+1%</span>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center destop:items-start">
                <div className="text-white flex flex-col items-center desktop:items-start h-[60px] desktop:border-b desktop:border-gray-primary/30">
                  <span className="text-xl font-semibold">
                    {translate("lvl")} 1
                  </span>
                  <div className="text-sm font-medium flex items-center gap-1 text-nowrap">
                    {translate("receive_additional")}{" "}
                    <span className="text-orange-secondary">1%</span>{" "}
                    {translate("bonus")}
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-4 w-full">
                  <div className="flex items-center relative">
                    <LoadSlashBar
                      className="rounded-full"
                      containerClass="bg-txtfifth h-1 w-full"
                      slashColors={{primary: "#FF3F1A", secondary: "#ff6242"}}
                      value={50}
                      slashWidth={50}
                      elementClass="justify-end"
                    >
                      <span className="bg-[#FFD530] text-[#995200] font-semibold text-xs rounded-full px-2 translate-x-1/2">
                        100K
                      </span>
                    </LoadSlashBar>
                    <img
                      src={LogoSun.src}
                      alt="logo-sun"
                      className="absolute w-4 h-4 -right-2 top-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div className="text-white w-full text-nowrap text-xs font-medium flex justify-center desktop:justify-start items-center gap-1">
                    {translate("need_more")}
                    <span className="font-semibold">100K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-[135px] gap-3">
          <div className="max-w-[135px] w-full aspect-square rounded-full bg-gray-primary flex flex-col gap-1 items-center justify-center">
            <Icon icon="tabler:lock-filled" fontSize={24} />
            <span className="w-[57px] text-sm font-medium">
              {translate("security_setup")}
            </span>
          </div>
          <div className="relative max-w-[135px] w-full aspect-square rounded-full bg-black flex items-center justify-center p-4">
            <ProgressCircle
              className="relative z-[1]"
              radius={45}
              dashCount={4}
              strokeWidth={5}
              dashColorList={["#1A94FF", "#1A94FF", "#1A94FF", "#EBEBF0"]}
            />
            <div className="flex flex-col justify-center gap-1 items-center absolute z-[2]">
              <span className="text-white font-semibold">82%</span>
              <span className="text-white text-xs font-medium">
                {translate("verified")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntroduceLinkInfo = () => {
  function handleCopyAffiliate(str: string): void {
    navigator.clipboard.writeText(str || "");
    toastNVB({type: "success", msg: translate("copied")});
  }

  return (
    <div className="flex relative min-h-[9.875rem] h-fit flex-col p-4 border border-gray-border rounded-lg gap-3 overflow-hidden">
      <div
        style={{
          background: `url(${AffiliateBlendBg.src})`,
          backgroundSize: "cover",
          mixBlendMode: "difference",
          width: "17.6875rem",
          height: "12.4375rem",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: "-2.5rem",
          right: "0",
          opacity: 0.8,
          transform: "scaleX(-1)",
          zIndex: 1,
        }}
        className="desktop:block hidden"
      />
      <div className="relative z-[2] flex flex-col gap-1">
        <span className="font-medium text-sm">
          {translate("your_referral_code")}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-bold text-txtthird">NVBPLAY110424</span>
          <Icon
            icon="tabler:copy"
            fontSize={20}
            color="#FF3F1A"
            onClick={() => handleCopyAffiliate("NVBPLAY110424")}
          />
        </div>
      </div>
      <div className="relative z-[2] w-full flex flex-col gap-1">
        <span className="font-medium text-sm">
          {translate("your_affiliate_link")}
        </span>
        <div className="min-h-10 w-full flex flex-col desktop:flex-row desktop:items-center gap-3">
          <div className="h-10 flex w-full max-w-[20.4375rem] items-center gap-3 bg-gray-primary p-1 pl-4 rounded-full">
            <span
              title="https://nvbplay.vn/NVB110424/"
              className="text-sm font-medium text-gray-icon truncate w-full"
            >
              https://nvbplay.vn/NVB110424/
            </span>
            <ButtonSubmitPrimary
              onClickHandle={() =>
                handleCopyAffiliate("https://nvbplay.vn/NVB110424/")
              }
              className="rounded-full w-fit h-8 min-w-[5rem] px-4 flex  items-center justify-center"
            >
              {translate("copy")}
            </ButtonSubmitPrimary>
          </div>
          <hr className="h-[.0625rem] w-full desktop:w-[.0625rem] desktop:h-10 bg-gray-border" />
          <div className="flex gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-white border-gray-border border rounded-full">
              <img
                src={FacebookBW.src}
                alt="img-facebook"
                className="w-[1.125rem] h-[1.125rem]"
              />
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-white border-gray-border border rounded-full">
              <img
                src={ZaloBW.src}
                alt="img-facebook"
                className="w-[1.125rem] h-[1.125rem]"
              />
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-white border-gray-border border rounded-full">
              <Icon icon="tabler:dots" fontSize={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
