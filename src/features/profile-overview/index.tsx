"use client";
import {Icon} from "@/components/common-components";
import {RootState} from "@/stores";
import {dateFormator} from "@/utilities/date";
import {CapitalizeFirstLetter} from "@/utilities/text";
import {translate} from "@/utilities/translator";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AccountAndOrder} from "./components/account-and-order";
import {Affiliate} from "./components/affiliate";
import {Statistics} from "./components/statistic";

export const WelcomeOverview = () => {
  const {user} = useSelector((state: RootState) => state.users_data);
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
  return (
    <div className="flex flex-row min-h-[84px] w-full items-center justify-between px-4">
      <div className="w-fit max-w-80 flex flex-col h-full">
        <span className="text-base desktop:text-[28px] leading-6 desktop:leading-[42px] text-txtprimary transition-all">
          {translate("hi")}, {user?.first_name || ""} 👋
        </span>
        <span className="text-base desktop:text-[28px] leading-6 desktop:leading-[42px] text-txtsecondary transition-all">
          {translate("how_are_you_today")}?
        </span>
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex h-12 desktop:h-20 gap-5 transition-all">
          <div className="flex items-center h-full aspect-square rounded-full border bg-txtthird text-white border-gray-eighth justify-center font-medium text-2xl desktop:text-[32px] transition-all">
            {currentDate.day}
          </div>
          <div className="flex flex-col justify-center h-full">
            <span className="text-sm desktop:text-[18px] text-txtprimary font-medium transition-all">
              {`${CapitalizeFirstLetter(translate("months"))} ${currentDate.month}` +
                ","}
            </span>
            <span className="text-sm desktop:text-[18px] text-txtprimary font-medium transition-all">
              {currentDate.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export const DetailOverview = () => {
  return (
    <div className="flex flex-col desktop:p-4 gap-6 bg-white rounded-lg">
      <AccountAndOrder />
      <Affiliate />
    </div>
  );
};

{
  /* <hr className="w-[1.5px] h-[52px] bg-gray-border" />
    <div className="h-12 min-w-[204px]: bg-white rounded-full flex items-center gap-2 pl-1 pr-3">
      <div className="rounded-full bg-gray-border h-10 w-10 flex items-center justify-center">
        <Icon icon="tabler:calendar-time" fontSize={20} />
      </div>
      <span className="text-sm text-txtprimary font-semibold">
        {typeof window != "undefined" &&
          dateFormator(new Date(), `dd Thg mm`) +
            " - " +
            dateFormator(new Date(), `dd Thg mm`)}
      </span>
    </div> */
}
