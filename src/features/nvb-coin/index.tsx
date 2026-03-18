"use client";
import {coin, ForPayment} from "@/assets/icons";
import {COMMON_DATA} from "@/configs";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setCurrentFilter} from "@/stores/coin-nvb-slice";
import {translate} from "@/utilities/translator";
import React, {FC, HTMLAttributes} from "react";
import {useDispatch, useSelector} from "react-redux";
import ButtonActiveCoinNVB from "./element";
COMMON_DATA;
const NVBCoin = () => {
  const {currentFilter} = useSelector((state: RootState) => state.coinNVB);
  const dispatch = useDispatch();
  return (
    <div className=" w-full flex flex-col ">
      <div className="w-full p-4 bg-gradient-to-b from-white via-white to-gray-primary h-[93px] flex items-center justify-between rounded-t-lg">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src={coin.src} alt="" className="h-7 w-7 aspect-square " />
            <span className="text-orange-primary font-bold text-2xl leading-9">
              1,200
            </span>
          </div>
          <span className="text-sm text-txtsecondary font-semibold flex items-center">
            700 {translate("coin_will_expire")} 11/04/2024
          </span>
        </div>
        <div className="flex items-end justify-end w-auto ">
          <div className="w-fit flex flex-col">
            <span className="text-sm text-txtsecondary font-semibold">
              700 {translate("coin_will_expire")} 11/04/2024
            </span>
            <span className="text-orange-primary font-bold text-right">
              +200
            </span>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-2 bg-white rounded-lg">
        <div className="w-full flex items-center gap-3">
          <ButtonActiveCoinNVB
            isActive={currentFilter === "all"}
            onHandleClick={() => dispatch(setCurrentFilter("all"))}
          >
            {translate("all")}
          </ButtonActiveCoinNVB>
          <ButtonActiveCoinNVB
            isActive={currentFilter === "received"}
            onHandleClick={() => dispatch(setCurrentFilter("received"))}
          >
            {translate("coin_received")}
          </ButtonActiveCoinNVB>
          <ButtonActiveCoinNVB
            isActive={currentFilter === "used"}
            onHandleClick={() => dispatch(setCurrentFilter("used"))}
          >
            {translate("coin_used")}
          </ButtonActiveCoinNVB>
          <ButtonActiveCoinNVB
            isActive={currentFilter === "expired"}
            onHandleClick={() => dispatch(setCurrentFilter("expired"))}
          >
            {translate("expired_coin")}
          </ButtonActiveCoinNVB>
        </div>
        <div className="w-full flex flex-col">
          {Array.from({length: 10}).map((_, index) => (
            <CoinNVBItem
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              data={undefined}
              state={
                index % 3 === 0
                  ? "expired"
                  : index % 4 === 0
                    ? "payment"
                    : "daily_roll_call"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NVBCoin;

type CoinNVBItemProps = {
  state: "expired" | "payment" | "daily_roll_call";
  data: any;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const CoinNVBItem: FC<CoinNVBItemProps> = ({
  data,
  state,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "w-full flex justify-between gap-3 py-4 animate-fade-up",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="h-[42px] w-[42px] aspect-square rounded-lg bg-gray-primary flex items-center justify-center">
          <img
            src={state === "payment" ? ForPayment.src : coin.src}
            alt=""
            className={cn(
              "h-[30px] w-[30px] aspect-square transition-all",
              state === "expired" && "saturate-0"
            )}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-txtfifth">
            {state === "daily_roll_call" && translate("daily_attendance")}
            {state === "payment" && translate("pay_for_orders")}
            {state === "expired" && translate("expired")}
          </span>
          <span className="font-semibold text-gray-sixth text-sm">
            {state === "daily_roll_call" && translate("complete_daily_tasks")}
            {state === "payment" && translate("complete_daily_tasks")}
            {state === "expired" && translate("expired_coin")}
          </span>
        </div>
      </div>
      {state === "daily_roll_call" && (
        <div className="flex flex-col">
          <span className="font-semibold text-end text-orange-primary">
            +200
          </span>
          <span className="font-semibold text-gray-sixth text-sm">
            11/04/2024 11:04
          </span>
        </div>
      )}
      {state !== "daily_roll_call" && (
        <div className="flex flex-col">
          <span className="font-semibold text-end text-orange-primary saturate-0">
            -200
          </span>
          <span className="font-semibold text-gray-sixth text-sm">
            11/04/2024 11:04
          </span>
        </div>
      )}
    </div>
  );
};
