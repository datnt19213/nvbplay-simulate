"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {Icon} from "@/components/common-components";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {STYLES} from "@/configs";
import {ViewMoreContentChoices} from "@/features/modals/builder/view-more-modal";
import {useMediaQuery} from "@/hooks/use-media-query";
import {cn} from "@/lib/utils";
import {setViewMoreModal} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import {ChevronUp} from "lucide-react";
import React, {useState} from "react";
import {useDispatch} from "react-redux";

const BuilderOrderInfo = () => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className={cn(
        "h-full w-full p-5 flex flex-col gap-2 desktop:gap-4 transition-all duration-500 ",
        !show && isMobile && "pt-0"
      )}
    >
      <span
        className={cn(
          "text-lg font-semibold text-txtfifth transition-all duration-200 h-[28px]",
          !show && isMobile && "h-0 opacity-0"
        )}
      >
        {translate("order_information")}
      </span>
      <div className="w-full gap-3 flex flex-col">
        <div
          aria-disabled={!show}
          className={cn(
            "flex flex-col w-full transition-all h-[98px] duration-500 gap-3 overflow-hidden",
            !show &&
              isMobile &&
              "h-0 opacity-0 pointer-events-none select-none delay-300"
          )}
        >
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-icon">
              {translate("total_amount")}
            </span>
            <span className="font-semibold text-txtfifth">0đ</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-icon">
              {translate("promote")}
            </span>
            <span className="font-semibold text-green-primary">-0đ</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-icon">
              {translate("total_amount")}
            </span>
            <span className="font-semibold text-green-primary">-0đ</span>
          </div>
          <hr className="w-full h-[1px] border border-dashed border-gray-border" />
        </div>
        <div className="flex justify-between pt-2">
          <span className="text-sm font-medium text-gray-icon">
            {translate("provisional")}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-gray-fifth">0đ</span>
            {isMobile && (
              <ChevronUp
                size={24}
                className={cn(
                  "transition-all duration-200 cursor-pointer",
                  show ? "rotate-180" : "rotate-0"
                )}
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex desktop:flex-col flex-row-reverse gap-2 w-full">
        <ButtonSubmitPrimary
          disabled={true}
          className="h-10 disabled:bg-gray-border disabled:text-black/15 "
        >
          {translate("add_to_cart")}
        </ButtonSubmitPrimary>
        <div className="flex items-center flex-row-reverse desktop:flex-row w-full gap-2">
          <ButtonSubmitPrimary
            disabled={true}
            className="h-10 disabled:bg-gray-border disabled:text-black/15"
          >
            {translate("buy_now")}
          </ButtonSubmitPrimary>
          {isMobile && (
            <Button
              size="icon"
              onClick={() => dispatch(setViewMoreModal(true))}
              className={cn(
                STYLES.disableFocusVisible,
                "bg-gray-border aspect-square h-10 hover:bg-gray-border text-txtfifth"
              )}
            >
              <Icon icon="tabler:dots" fontSize={24} />
            </Button>
          )}
          {!isMobile && (
            <Popover>
              <PopoverTrigger
                className={cn(
                  STYLES.disableFocusVisible,
                  "bg-gray-border aspect-square h-10 hover:bg-gray-border text-txtfifth flex justify-center items-center rounded-lg"
                )}
              >
                <Icon icon="tabler:dots" fontSize={24} />
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="border-none w-full max-w-[300px] rounded-[16px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.05)]"
              >
                <ViewMoreContentChoices />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderOrderInfo;
