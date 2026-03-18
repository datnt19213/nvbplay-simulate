"use client";
import {
  Collection,
  StoreSuggest,
  ProSuggest,
  Batminton,
  Shirt,
} from "@/assets/icons";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import BackTo from "@/components/particals/back-to";
import {CollectionItemRectangle} from "@/components/particals/mega-menu/elements";
import {useWindowSize} from "@/hooks";
import {translate} from "@/utilities/translator";
import {ChevronLeft} from "lucide-react";
import {redirect, RedirectType, useRouter} from "next/navigation";
import React from "react";

const Builder = () => {
  const [width, height] = useWindowSize();
  const router = useRouter();
  if (width < 1200) {
    return (
      <div className=" flex flex-col gap-2 w-full">
        <BackTo
          backToButton={<ChevronLeft size={24} />}
          className="h-14 flex ice justify-center text-base"
          titleClass="w-full text-center"
          url="/"
        >
          {translate("build_equipment")}
        </BackTo>
        <div className="flex flex-col gap-2 w-full px-2">
          <div className="flex flex-col w-full rounded-lg bg-white">
            <ButtonSubmitPrimary
              className="bg-white hover:bg-white flex items-center gap-2 justify-start text-txtprimary h-12"
              onClickHandle={() => router.push("/builder/build-new")}
            >
              <img src={Shirt.src} alt="icon" className="h-6 w-6" />
              <span className="font-medium text-sm">
                {translate("build_equipment")}
              </span>
            </ButtonSubmitPrimary>
            <hr className="border-gray-border w-[calc(100%-24px)] mx-auto h-[1px]" />
            <ButtonSubmitPrimary
              className="bg-white hover:bg-white flex items-center gap-2 justify-start text-txtprimary h-12"
              onClickHandle={() => router.push("/builder/collection")}
            >
              <img src={Collection.src} alt="icon" className="h-6 w-6" />
              <span className="font-medium text-sm">
                {translate("collection_saved")}
              </span>
            </ButtonSubmitPrimary>
            <hr className="border-gray-border w-[calc(100%-24px)] mx-auto h-[1px]" />

            <ButtonSubmitPrimary
              className="bg-white hover:bg-white flex items-center gap-2 justify-start text-txtprimary h-12"
              onClickHandle={() => router.push("/builder/store-suggest")}
            >
              <img src={StoreSuggest.src} alt="icon" className="h-6 w-6" />
              <span className="font-medium text-sm">
                {translate("store_suggest")}
              </span>
            </ButtonSubmitPrimary>
            <hr className="border-gray-border w-[calc(100%-24px)] mx-auto h-[1px]" />

            <ButtonSubmitPrimary
              className="bg-white hover:bg-white flex items-center gap-2 justify-start text-txtprimary h-12"
              onClickHandle={() => router.push("/builder/pro-suggest")}
            >
              <img src={ProSuggest.src} alt="icon" className="h-6 w-6" />
              <span className="font-medium text-sm">
                {translate("pro_suggest")}
              </span>
            </ButtonSubmitPrimary>
          </div>
          <div className="h-[calc(100dvh-275px)] flex flex-col w-full bg-white px-3 py-5">
            <CollectionItemRectangle
              image={Batminton.src}
              title="Chinh phục vô địch khi xây dựng trang bị tại NVB Play"
            />
          </div>
        </div>
      </div>
    );
  }
  redirect("/builder/build-new", RedirectType.replace);
};

export default Builder;
