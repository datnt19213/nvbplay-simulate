"use client";
import React, {useEffect} from "react";
import ProductSaleList from "./components/product-sale-list";
import {FlashsaleBanner, FlashsaleStars, NotRecord} from "@/assets/images";
import {Lighting} from "@/assets/icons";
import CountdownBox from "@/components/base-components/counter/countdown";
import {translate} from "@/utilities/translator";
import {usePriceList} from "@/hooks/queries/price-list";
import {setActive, setPriceList} from "@/stores/datas/price-list";
import {useDispatch, useSelector} from "react-redux";
import TimeoutAction from "@/components/particals/timeout";
import EmptyItem from "@/components/base-components/cta/empty-item";
import ProductSkeleton from "@/components/base-components/skeletons/product-skeleton";
import {RootState} from "@/stores";
import {FadeUpMotionLayout} from "@/layouts/component-layouts";
import {cn} from "@/lib/utils";

export const FlashSaleProductList = () => {
  const {data: priceList, isLoading, isSuccess} = usePriceList();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && priceList && priceList.length > 0) {
      dispatch(setPriceList(priceList));
    }
  }, [isSuccess, priceList, dispatch]);
  return (
    <div className="p-2 w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 desktop:grid-cols-5 gap-4">
      {isLoading && (
        <TimeoutAction
          tick={1000000}
          loading={isLoading}
          onEndComponent={
            <div className="col-span-2 md:col-span-2 lg:col-span-4 desktop:col-span-5">
              <EmptyItem
                image={NotRecord.src}
                title={translate("product_not_found")}
                isNavigable={false}
              />
            </div>
          }
          onTickComponent={Array.from({length: 10}).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        />
      )}
      {isSuccess && priceList && priceList?.length > 0 && <ProductSaleList />}
    </div>
  );
};

export const FlashSaleCountDown = () => {
  return (
    <div className="flex items-center justify-center h-[56px] desktop:h-[68px] w-full bg-black-secondary">
      <img
        src={FlashsaleStars.src}
        alt="img_stars"
        className="h-[56px] desktop:h-[68px] absolute z-[1] w-[900px]"
      />
      <div className="flex items-center gap-4 relative z-[2]">
        <div className="flex items-center gap-1">
          <img src={Lighting.src} alt="img_lighting" className="w-8 h-8" />
          <div className="text-sm desktop:text-xl font-semibold flex items-center gap-2 text-orange-secondary">
            Flash Sale{" "}
            <span className="font-medium text-white">
              {translate("end_after")}
            </span>
          </div>
        </div>
        <CountdownBox
          targetDate={"2025-01-30T23:59:59"}
          itemClass="rounded-lg z-[1]"
          numberClass="relative text-xs h-[28px] w-[28px] desktop:h-[44px] desktop:w-[44px] desktop:text-lg overflow-hidden before:absolute before:h-[7px] before:w-[7px] before:bottom-0 before:z-[2] before:left-0 before:bg-txtthird before:rounded-[2px]"
        />
      </div>
    </div>
  );
};

export const FlashSaleBanner = () => {
  return (
    <div className="w-full bg-gray-primary overflow-hidden rounded-t-lg">
      <img
        src={FlashsaleBanner.src}
        alt="img_banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const FlashSaleTab = () => {
  const {priceList, active} = useSelector(
    (state: RootState) => state.price_list
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (priceList && priceList.length > 0) {
      dispatch(setActive(priceList[0].id));
    }
  }, [priceList]);
  const handleSetActive = (id: string) => {
    dispatch(setActive(id));
  };
  return (
    <div className="h-[58px] desktop:h-[73px] w-full bg-white flex items-center justify-center">
      <div className="container h-full mx-auto w-full grid grid-cols-3">
        {priceList && (
          <>
            {priceList.map((item, index) => (
              <FadeUpMotionLayout key={index}>
                <div
                  className={cn(
                    "w-full h-full bg-gradient-to-t border-b-2 border-b-transparent from-txtthird/20 to-transparent flex flex-col items-center justify-center",
                    active === item?.id && "border-b-txtthird"
                  )}
                  onClick={() => handleSetActive(item.id)}
                >
                  <span className="text-txtthird font-bold text-base desktop:text-2xl">
                    10:00
                  </span>
                  <span className="font-medium text-xs desktop:text-sm text-[#6C2F00]">
                    {item.status === "active"
                      ? translate("taking_place")
                      : translate("upcoming")}
                  </span>
                </div>
              </FadeUpMotionLayout>
            ))}
          </>
        )}

        <div className="w-full bg-white flex flex-col items-center justify-center">
          <span className="text-gray-seventh font-bold text-base desktop:text-2xl">
            13:00
          </span>
          <span className="font-medium text-xs desktop:text-sm text-[#c4c4cf]">
            {translate("upcoming")}
          </span>
        </div>
        <div className="w-full bg-white flex flex-col items-center justify-center">
          <span className="text-gray-seventh font-bold text-base desktop:text-2xl">
            13:00
          </span>
          <span className="font-medium text-xs desktop:text-sm text-[#c4c4cf]">
            {translate("upcoming")}
          </span>
        </div>
      </div>
    </div>
  );
};
