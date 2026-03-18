"use client";
import {EquipmentButtonList} from "@/components/particals/builder-header";
import BuilderEditor from "@/features/builder/components/builder-editor";
import BuilderFilterSort from "@/features/builder/components/builder-filter-sort";
import BuilderOrderInfo from "@/features/builder/components/builder-order-info";
import BuilderProductsList from "@/features/builder/components/builder-products-list";
import BuilderSupport from "@/features/builder/components/builder-support";
import BuilderSwitch from "@/features/builder/components/builder-switch";
import {useWindowSize} from "@/hooks";
import {useMediaQuery} from "@/hooks/use-media-query";
import React from "react";

const BuildNew = () => {
  const [width, height] = useWindowSize();
  const isMobile = useMediaQuery("(max-width: 1200px)");

  if (isMobile) {
    return (
      <div className="flex w-full flex-col bg-white pb-[200px]">
        <BuilderSwitch />
        <EquipmentButtonList className="desktop:flex hidden" />
        <BuilderEditor />
        <div className="w-full fixed z-[51] bottom-0 left-0 right-0 shadow-[-4px_0px_16px_rgba(10,10,10,0.05)] bg-white">
          <BuilderOrderInfo />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full hidden desktop:flex min-h-[calc(100dvh-88px)]">
      <div className="flex max-w-[320px] min-w-[320px] border-r border-gray-border flex-col bg-white">
        <BuilderSwitch />
        <BuilderEditor />
      </div>
      <div className="flex w-full flex-col">
        <BuilderFilterSort />
        <BuilderProductsList />
      </div>
      <div className="flex max-w-[320px] min-w-[320px] border-l border-gray-border flex-col bg-white h-[calc(100dvh-88px)] justify-between">
        <BuilderOrderInfo />
        <BuilderSupport />
      </div>
    </div>
  );
};

export default BuildNew;
