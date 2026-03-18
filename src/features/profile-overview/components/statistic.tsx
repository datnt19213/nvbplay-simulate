"use client";
import {StackBarChart} from "@/components/base-components/chart";
import WaveLineChart from "@/components/base-components/chart/line-chart";
import {DateSlide} from "@/components/base-components/date";
import {Icon} from "@/components/common-components";
import Selection from "@/components/custom/selection";
import {COMMON_DATA} from "@/configs";
import {RootState} from "@/stores";
import {setCurrentSortDWMY} from "@/stores/overview";
import {KeyJSON, translate} from "@/utilities/translator";
import {ChevronsUpDown} from "lucide-react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {MiniOutlineBtn} from "../elements";
import {HologramNvb} from "@/assets/images";

const sample = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const Statistics = () => {
  return (
    <div className="grid grid-cols-2 desktop:grid-cols-3 gap-3">
      <StatisticDiscount />
      <OtherStatistic />
    </div>
  );
};

const StatisticDiscount = () => {
  const {currentSortDWMY} = useSelector((state: RootState) => state.overview);
  const dispatch = useDispatch();
  return (
    <div className="col-span-2 row-span-2 flex flex-col gap-3 bg-white rounded-lg p-4 border border-gray-border">
      <div className="flex justify-between items-center">
        <span className="font-semibold">
          {translate("discount_statistics")}
        </span>
        <Selection
          selectComponent={<ChevronsUpDown size={20} />}
          triggerClass="min-w-[111px] bg-white rounded-full border border-gray-border"
          items={COMMON_DATA.dwmy_sort.map((item) => ({
            ...item,
            name: translate(item.name as KeyJSON),
          }))}
          selectedItem={{
            id: Math.random(),
            name: translate(currentSortDWMY as KeyJSON),
            value: currentSortDWMY,
          }}
          onSelected={(selected) =>
            dispatch(setCurrentSortDWMY(selected.value))
          }
        />
      </div>
      <DateSlide
        currentViewMode={currentSortDWMY}
        onDateChange={(startDate, endDate) => null}
      />
      <StackBarChart
        items={sample}
        barSize={40}
        w={522}
        h={252}
        rounded={{
          top: [8, 8, 8, 8],
          bottom: [8, 8, 8, 8],
        }}
        stackKeys={{keyA: "uv", keyB: "pv", stackId: "testkey"}}
      />
    </div>
  );
};

export const OtherStatistic = () => {
  return (
    <>
      <div className="col-span-1 row-span-1 w-full p-4 rounded-lg bg-gray-primary h-[208px] flex flex-col gap-2">
        <div className="flex justify-between items-center !w-full">
          <div className="w-10 h-10 aspect-square bg-white rounded-full flex items-center justify-center">
            <Icon icon="tabler:receipt-2" fontSize={24} />
          </div>
          <div className="flex items-end gap-1">
            <span className="text-xl font-semibold text-txtthird">120</span>
            <span className="text-sm text-nowrap font-medium leading-[21px] lowercase text-gray-icon">
              {translate("products")}
            </span>
          </div>
        </div>
        <div className="flex items-center relative before:absolute before:content[] before:pointer-events-none before:left-0 before:top-0 before:z-[2] before:h-full before:w-8 before:bg-gradient-to-r before:from-gray-primary/80 before:via-gray-primary/80 before:from-50% before:via-25% before:to-transparent after:absolute after:content[] after:pointer-events-none after:right-0 after:top-0 after:z-[2] after:h-full after:w-8 after:bg-gradient-to-l after:from-gray-primary/80 after:via-gray-primary/80 after:from-50% after:via-25% after:to-transparent">
          <WaveLineChart
            items={sample}
            keyId="uv"
            dot={false}
            colorLine="#FF3F1A"
            className="relative z-[1]"
          />
        </div>
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col justify-between">
            <span className="text-xl font-semibold text-txtprimary ">
              {translate("sold")}
            </span>
            <span className="text-sm text-nowrap font-medium text-gray-icon">
              {translate("product_introduce_sold")}
            </span>
          </div>
          <MiniOutlineBtn className="flex items-center justify-center text-green-primary">
            +12.6%
          </MiniOutlineBtn>
        </div>
      </div>
      <div className="col-span-1 row-span-1 h-full desktop:h-[164px] flex flex-col bg-gray-primary rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-border rounded-s bg-gradient-to-b from-txtthird to-[#BF381D] aspect-square"></div>
          <span className="font-semibold">{translate("affiliate")}</span>
        </div>
        <div className="relative w-full h-full">
          <div className="absolute -bottom-4 right-0 desktop:left-0">
            <img
              src={HologramNvb.src}
              alt="hologram-nvb"
              className=" w-[54px] desktop:w-[88px] h-auto object-contain object-center"
            />
          </div>
          <div className="absolute bottom-0 left-0 desktop:right-0 flex flex-col justify-end gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-txtprimary">
                {translate("invited")}
              </span>
              <div className="text-sm text-nowrap font-semibold rounded-full px-1 h-6 flex items-center gap-1 bg-green-secondary">
                <Icon
                  icon="tabler:arrow-up-right"
                  fontSize={16}
                  fill="#079449"
                />
                <span className="text-green-primary">50%</span>
              </div>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-[32px] leading-[48px] font-semibold text-txtprimary">
                12
              </span>
              <span className="text-sm font-medium text-gray-icon leading-[21px] pb-1.5">
                {translate("people")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
