"use client";
import {CoupleBatminton} from "@/assets/images";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {CollectionItemRectangle} from "@/components/particals/mega-menu/elements";
import {translate} from "@/utilities/translator";
import React from "react";

const BuilderSupport = () => {
  return (
    <div className="flex items-center w-full flex-col gap-3 p-5 border-t border-gray-border min-h-[302px]">
      <CollectionItemRectangle
        title={"Chinh phục vô địch khi xây dựng trang bị tại NVB Play"}
        image={CoupleBatminton.src}
      />
      <ButtonSubmitPrimary className="bg-gray-border text-gray-icon hover:bg-gray-border hover:text-gray-icon">
        {translate("get_advice_from_the_store")}
      </ButtonSubmitPrimary>
    </div>
  );
};

export default BuilderSupport;
