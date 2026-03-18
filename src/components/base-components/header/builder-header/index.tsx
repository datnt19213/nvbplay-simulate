"use client";
import {
  ToBackEquipment,
  EquipmentButtonList,
  CartBuilderHeader,
} from "@/components/particals/builder-header";
import {KeyJSON, translate} from "@/utilities/translator";
import {usePathname} from "next/navigation";
import React, {FC} from "react";
import SearchInput from "../../input/search-input";
import Select from "../../select";
import SelectInput from "../../input/select-input";
import {COMMON_DATA, STYLES} from "@/configs";
import {cn} from "@/lib/utils";
import {useMediaQuery} from "@/hooks/use-media-query";
import BackTo from "@/components/particals/back-to";
import {ChevronLeft} from "lucide-react";

export const BuilderHeader = () => {
  const pathName = usePathname();
  if (pathName.includes("/builder/build-new")) return <BuilderNew />;
  if (
    pathName.includes("/builder/collection") ||
    pathName.includes("/builder/store-suggest") ||
    pathName.includes("/builder/pro-suggest")
  )
    return <BuilderCollection />;
};

type BuilderNewProps = {
  isToBack?: boolean;
  isEquipmentList?: boolean;
  isCart?: boolean;
};
const BuilderNew: FC<BuilderNewProps> = ({
  isCart = true,
  isEquipmentList = true,
  isToBack = true,
}) => {
  return (
    <div className="w-full h-[88px] flex items-center justify-between bg-white p-5 border-b border-gray-border">
      {isToBack && (
        <ToBackEquipment
          nameOfEquipment={"Trang bị chưa đặt tên"}
          description={"Xây dựng trang bị mới"}
        />
      )}
      {isEquipmentList && (
        <EquipmentButtonList className="desktop:flex hidden" />
      )}
      {isCart && <CartBuilderHeader />}
    </div>
  );
};

type BuilderCollectionProps = {
  isSearch?: boolean;
  isFilter?: boolean;
  isSort?: boolean;
  isCart?: boolean;
};
const BuilderCollection: FC<BuilderCollectionProps> = ({
  isCart = true,
  isFilter = true,
  isSearch = true,
  isSort = true,
}) => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  return (
    <div className="w-full min-h-[88px] flex flex-col desktop:flex-row items-start desktop:items-center desktop:justify-between bg-white p-5 border-b border-gray-border gap-4 max-w-[1360px]">
      <div className="flex justify-between w-full desktop:w-fit items-center">
        <div className="flex items-center gap-3">
          {isMobile && (
            <BackTo
              backToButton={<ChevronLeft size={24} />}
              titleClass="font-semibold text-lg text-txtprimary text-nowrap"
            >
              {translate("the_collection_has_been_saved")}
            </BackTo>
          )}
          {!isMobile && (
            <span className="font-semibold text-lg text-txtprimary text-nowrap">
              {translate("the_collection_has_been_saved")}
            </span>
          )}
        </div>
        {isCart && isMobile && (
          <>
            <hr className="h-9 my-auto w-[1px] bg-gray-border desktop:block hidden" />
            <CartBuilderHeader />
          </>
        )}
      </div>
      {!isMobile && (
        <div className="flex gap-4 max-w-[1018px] w-full justify-end items-center">
          <div className="flex w-full items-center justify-end gap-4 ">
            {isSearch && (
              <SearchInput
                placeholder={translate("name_of_the_collection")}
                containerClassName="w-full max-w-[480px] bg-white border border-gray-border px-2"
              />
            )}
            {isFilter && (
              <>
                <hr className="h-9 my-auto w-[1px] bg-gray-border" />
                <div className="flex items-center gap-2">
                  <span className="text-txtsecondary font-medium text-sm text-nowrap">
                    {translate("subject")}
                  </span>
                  <Select
                    className={cn(
                      STYLES.disableFocusVisible,
                      "desktop:max-w-[165px] w-full min-w-[140px] bg-white border border-gray-border rounded-full h-[40px]"
                    )}
                    items={[{id: "0", name: "Badminton", value: "Badminton"}]}
                    actionButton={(data) => (
                      <span className="text-sm font-medium">{data?.name}</span>
                    )}
                  />
                </div>
              </>
            )}
            {isSort && (
              <>
                <hr className="h-9 my-auto w-[1px] bg-gray-border" />
                <div className="flex items-center gap-2">
                  <span className="text-txtsecondary font-medium text-sm text-nowrap">
                    {translate("sort_by")}
                  </span>

                  <Select
                    actionButton={(data) => (
                      <span className="text-sm font-medium">{data?.name}</span>
                    )}
                    className={cn(
                      STYLES.disableFocusVisible,
                      "desktop:max-w-[165px] w-full min-w-[140px] bg-white border border-gray-border rounded-full h-[40px]"
                    )}
                    items={COMMON_DATA.sort_by.map((item) => ({
                      id: item.id.toString(),
                      value: translate(item.name as KeyJSON),
                      name: translate(item.name as KeyJSON),
                    }))}
                  />
                </div>
              </>
            )}
          </div>
          {isCart && (
            <>
              <hr className="h-9 my-auto w-[1px] bg-gray-border desktop:block hidden" />
              <CartBuilderHeader />
            </>
          )}
        </div>
      )}
      {isMobile && (
        <div className="flex flex-col gap-2 w-full justify-end items-center">
          <div className="flex w-full items-center justify-end gap-4 ">
            {isSearch && (
              <SearchInput
                placeholder={translate("name_of_the_collection")}
                containerClassName="w-full bg-white border border-gray-border px-2"
              />
            )}
          </div>
          <div className="flex items-center gap-2 w-full">
            {isFilter && (
              <>
                <div className="flex items-center gap-2 w-full">
                  <Select
                    className={cn(
                      STYLES.disableFocusVisible,
                      "w-full bg-white border border-gray-border rounded-full h-[40px]"
                    )}
                    items={[{id: "0", name: "Badminton", value: "Badminton"}]}
                    actionButton={(data) => (
                      <span className="text-sm font-medium">{data?.name}</span>
                    )}
                  />
                </div>
              </>
            )}
            {isSort && (
              <>
                <div className="flex items-center gap-2 w-full">
                  <Select
                    actionButton={(data) => (
                      <span className="text-sm font-medium">{data?.name}</span>
                    )}
                    className={cn(
                      STYLES.disableFocusVisible,
                      "w-full bg-white border border-gray-border rounded-full h-[40px]"
                    )}
                    items={COMMON_DATA.sort_by.map((item) => ({
                      id: item.id.toString(),
                      value: translate(item.name as KeyJSON),
                      name: translate(item.name as KeyJSON),
                    }))}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
