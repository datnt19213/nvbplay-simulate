"use client";
import Gavatar from "@/components/base-components/avartar";
import {Icon} from "@/components/common-components";
import RatingLists from "@/features/ratings";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setCurrentFilter} from "@/stores/ratings";
import {formatNumber} from "@/utilities/formator";
import {GetBgColorFromFirstVowel} from "@/utilities/text-to-color";
import {translate} from "@/utilities/translator";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

const MyRatings = () => {
  const {currentFilter} = useSelector((state: RootState) => state.ratings);
  const {user} = useSelector((state: RootState) => state.users_data);
  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-col gap-3 animate-fade">
      <div className="w-full pt-4 rounded-t-lg bg-white">
        <div className="w-full flex items-center text-left px-5 text-lg font-semibold text-txtprimary h-10">
          {translate("my_assessment")}
        </div>
        <div className="w-full flex flex-col desktop:flex-row items-center gap-3 justify-between px-5 desktop:pb-5">
          <div className="flex gap-2 justify-between w-full desktop:w-fit items-center">
            <div className="flex items-center gap-3 text-nowrap">
              <div className="flex items-center justify-center bg-gray-primary rounded-lg h-12 w-12 aspect-square">
                <Icon icon="tabler:message-2-filled" fontSize={32} />
              </div>
              <div className="flex flex-col ">
                <span className="text-sm font-medium text-gray-icon">
                  {translate("reviewed")}
                </span>
                <span className="text-lg font-semibold">12</span>
              </div>
            </div>
            {/* <img src={BgAuth.src} className="size-10 rounded-full" /> */}
            <Gavatar
              backgroundColor={GetBgColorFromFirstVowel(
                (user?.first_name && user?.first_name) || "A"
              )}
              rounded
              className="!size-10 desktop:hidden"
            >
              {(user?.first_name && user?.first_name?.[0]) || "A"}
            </Gavatar>
          </div>
          <div className="flex items-center desktop:justify-end justify-center border-t border-b desktop:border-none w-full p-4">
            <div className="flex flex-col justify-center w-full max-w-[7.5rem]">
              <span className="text-sm font-medium text-gray-icon text-center">
                {translate("coin_received")}
              </span>
              <span className="text-lg font-semibold text-center">
                {formatNumber(6200)}
              </span>
            </div>
            <hr className="w-[1px] h-6 bg-gray-border" />
            <div className="flex flex-col justify-center w-full max-w-[7.5rem]">
              <span className="text-sm font-medium text-gray-icon text-center">
                {translate("likes")}
              </span>
              <span className="text-lg font-semibold text-center">
                {formatNumber(200, {precision: 0})}
              </span>
            </div>
            <hr className="w-[1px] h-6 bg-gray-border" />
            <div className="flex flex-col justify-center w-full max-w-[7.5rem]">
              <span className="text-sm font-medium text-gray-icon text-center">
                {translate("feedback")}
              </span>
              <span className="text-lg font-semibold text-center">
                {formatNumber(64, {precision: 0})}
              </span>
            </div>
            <hr className="w-[1px] h-6 bg-gray-border" />
            <div className="flex flex-col justify-center w-full max-w-[7.5rem]">
              <span className="text-sm font-medium text-gray-icon text-center">
                {translate("view")}
              </span>
              <span className="text-lg font-semibold text-center">
                {formatNumber(29000)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-12 w-full desktop:px-0 px-4">
          <div
            onClick={() => dispatch(setCurrentFilter("unprecedented"))}
            className={cn(
              "px-5 py-3 border-b-2 border-white cursor-pointer transition-all duration-300 text-sm font-semibold",
              currentFilter === "unprecedented"
                ? "border-txtthird text-txtthird"
                : "border-white text-gray-icon"
            )}
          >
            <span>{translate("unprecedented")}</span>
          </div>
          <div
            onClick={() => dispatch(setCurrentFilter("reviewed"))}
            className={cn(
              "px-5 py-3 border-b-2 border-white cursor-pointer transition-all duration-300 text-sm font-semibold",
              currentFilter === "reviewed"
                ? "border-txtthird text-txtthird"
                : "border-white text-gray-icon"
            )}
          >
            <span>{translate("reviewed")}</span>
          </div>
        </div>
      </div>
      {currentFilter === "unprecedented" && (
        <RatingLists type="unprecedented" />
      )}
      {currentFilter === "reviewed" && <RatingLists type="reviewed" />}
    </div>
  );
};

export default MyRatings;
