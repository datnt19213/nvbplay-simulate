"use client";
import {YellowCrown} from "@/assets/icons";
import {DarkBg, Logo} from "@/assets/images";
import {BlendButton} from "@/components/base-components/buttons/button-border-gradient";
import Image from "@/components/base-components/images/image";
import {translate} from "@/utilities/translator";
import {ChevronRight} from "lucide-react";
import React, {FC} from "react";

type EquipmentSetCreatedByProps = {
  by?: "store" | "pro";
  created_by: string;
  avatar: string;
};
export const EquipmentSetCreateddBy: FC<EquipmentSetCreatedByProps> = ({
  by,
  avatar,
  created_by,
}) => {
  function handleViewInStore(): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <div className="flex items-center gap-2 justify-between h-10">
      <div className="flex items-center gap-2">
        <Image
          src={Logo.src || avatar}
          className="rounded-full min-w-10 aspect-square"
        />
        <div className="flex flex-col justify-center">
          <span className="text-xs font-medium text-txtsecondary">
            {translate("created_by")}
          </span>
          <span className="text-sm font-semibold text-txtfifth truncate">
            {created_by}
          </span>
        </div>
      </div>
      {by === "store" && (
        <div
          className="flex items-center gap-1 justify-end text-nowrap select-none cursor-pointer"
          onClick={() => handleViewInStore()}
        >
          <span className="text-sm font-semibold text-gray-icon truncate">
            {translate("see_the_store")}
          </span>
          <ChevronRight size={20} className=" text-gray-icon" />
        </div>
      )}
      {by === "pro" && (
        <BlendButton
          containerClass="h-6 text-[11px]"
          borderDegrees={135}
          backgroundImage={DarkBg.src}
          borderColors="#FDF5BC, #BE8F0D"
          className="relative"
        >
          {translate("pro")}
          <img
            src={YellowCrown.src}
            alt="image"
            className="size-4 absolute -top-3 -right-5 rotate-45"
          />
        </BlendButton>
      )}
    </div>
  );
};
