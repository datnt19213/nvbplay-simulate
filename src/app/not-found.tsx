"use client";
import {PageNotFound} from "@/assets/images";
import ComingSoon from "@/components/base-components/cta/coming-soon";
import EmptyItem from "@/components/base-components/cta/empty-item";
import {translate} from "@/utilities/translator";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <EmptyItem
        image={PageNotFound.src}
        isNavigable
        navigateUrl="/"
        titleClass="font-[800] text-[20px] text-txtfifth desktop:text-[32px] w-full max-w-[491px] text-center"
        subTitle={translate(
          "the_page_you_are_looking_for_does_not_exist_or_has_been_moved_please_try_again_or_return_to_the_homepage"
        )}
        subTitleClass="font-medium text-sm text-gray-icon w-full max-w-[491px] text-center"
        buttonTitle={translate("back_to_home")}
        title={translate("oops_page_not_found")}
      />
    </>
  );
}
