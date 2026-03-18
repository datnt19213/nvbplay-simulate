import { ArrowPopupIcon, BotChatIcon, StarIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import React from "react";

const BotTrigger = () => {
  return (
    <div>
      <div className="relative">
        <div className="absolute -top-full -left-0">
          <div className="relative flex items-start justify-start gap-2 bg-gradient-to-r from-[#FFAC52] to-[#FF3F1A] rounded-xl p-3 w-[237px] max-w-[280px]">
            <p className="text-sm text-white">
              Xin chào! Mình là Trợ thủ AI NVB - Hổ trợ CSKH tự động
            </p>
            <img
              src={StarIcon.src}
              alt="StarIcon"
              className="size-5"
              loading="lazy"
            />
            <img
              src={ArrowPopupIcon.src}
              alt="ArrowPopupIcon"
              className="w-3 h-3 absolute -bottom-2.5 right-5"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-[280px] pt-0.5">
          <div />
          <Button variant="ghost" className="p-0 h-fit w-fit">
            <img
              src={BotChatIcon.src}
              alt="BotChatIcon"
              className="w-[60px] h-[70px] rounded-lg"
              loading="lazy"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BotTrigger;
