"use client";
import Selection from "@/components/custom/selection";
import {COMMON_DATA} from "@/configs";
import {KeyJSON, translate} from "@/utilities/translator";
import React, {useState} from "react";
import FlashCategoryItem from "../elements/flash-category";
import {Fire} from "@/assets/icons";
import {Icon} from "@/components/common-components";
import RePopover from "@/components/custom/popover";
import {ButtonFilter} from "../elements/button-filter";
import {ArrowDown, ArrowUp, Dot} from "lucide-react";

const FlashsaleFilter = () => {
  const [priceToggle, setPriceToggle] = useState(false);
  return (
    <div className="flex flex-col desktop:flex-row justify-between items-center min-h-[52px] px-4 pt-5 gap-4 w-full">
      <div className="w-full flex items-center gap-2">
        <div className="flex items-center w-full desktop:w-fit overflow-x-scroll scrollbar-none">
          <div className="flex items-center gap-2 w-fit">
            <FlashCategoryItem
              className="text-nowrap h-[32px] desktop:h-[52px]"
              icon={
                <img
                  src={Fire.src}
                  className="min-w-[20px] desktop:min-w-[30px] min-h-[20px] desktop:min-h-[30px]"
                />
              }
              title={"Nổi bật"}
            />
            <FlashCategoryItem
              className="text-nowrap h-[32px] desktop:h-[52px] gap-0"
              icon={<></>}
              title={"Cầu lông"}
            />
            <FlashCategoryItem
              className="text-nowrap h-[32px] desktop:h-[52px] gap-0"
              icon={<></>}
              title={"Pickle ball"}
            />
            <FlashCategoryItem
              className="text-nowrap h-[32px] desktop:h-[52px] gap-0"
              icon={<></>}
              title={"Giày"}
            />
            <FlashCategoryItem
              className="text-nowrap h-[32px] desktop:h-[52px] gap-0"
              icon={<></>}
              title={"Chăm sóc sức khoẻ"}
            />
          </div>
        </div>
        <RePopover
          triggerClass="h-[32px] desktop:h-[52px] rounded-lg py-2 px-4 bg-gray-border hidden desktop:flex items-center justify-center"
          triggerContent={<Icon icon="tabler:dots" fontSize={24} />}
        >
          <span className="px-4 py-3 text-sm font-medium">No thing</span>
        </RePopover>
      </div>
      <div className="w-full flex desktop:hidden items-center gap-2">
        <div className="w-full flex items-center gap-2">
          <ButtonFilter
            label={translate("best_seller")}
            className="text-sm font-medium text-txtfifth w-full"
            icon={<Dot size={24} className="text-gray-seventh" />}
          />
          <ButtonFilter
            label={translate("newest")}
            className="text-sm font-medium text-txtfifth w-full"
            icon={<Dot size={24} className="text-gray-seventh" />}
          />
          <ButtonFilter
            label={translate("deep_discount")}
            className="text-sm font-medium text-txtfifth w-full"
            icon={<Dot size={24} className="text-gray-seventh" />}
          />
          <ButtonFilter
            onClick={() => setPriceToggle((prev) => !prev)}
            label={translate("price")}
            className="text-sm font-medium text-txtfifth w-full"
            icon={priceToggle ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
          />
        </div>
      </div>
      <div className="w-[261px] hidden desktop:flex items-center gap-2">
        <span className="text-sm font-medium text-nowrap">
          {translate("sort_by")}:
        </span>
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-2 w-full">
          <Selection
            triggerClass="w-full"
            selectValueClass="text-sm"
            items={COMMON_DATA.flashsale_sort.map((item: any) => ({
              ...item,
              name: translate(item.name),
            }))}
            onSelected={() => null}
            defaultValue={{
              ...COMMON_DATA.flashsale_sort[0],
              name:
                COMMON_DATA.flashsale_sort[0]?.name &&
                translate(COMMON_DATA.flashsale_sort[0]?.name as KeyJSON),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlashsaleFilter;
