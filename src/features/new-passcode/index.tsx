"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {OtpInput} from "@/components/base-components/input";
import {toastNVB} from "@/components/base-components/toast";
import BackTo from "@/components/particals/back-to";
import {cn} from "@/lib/utils";
import {translate} from "@/utilities/translator";
import React, {useState} from "react";

const NewPasscodeForm = () => {
  const [code, setCode] = useState("");
  function handleContinue() {
    toastNVB({type: "info", msg: code});
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <BackTo url="/profile/personal-info/security">
        {translate("create_new_passcode")}
      </BackTo>
      <div className="min-h-[302px] w-full flex items-center justify-center bg-white rounded-lg animate-fade-up">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 items-center">
            <span>{translate("please_enter_the_new_passcode")}</span>
            <OtpInput
              length={6}
              onChange={(otp: string) => setCode(otp)}
              focusActive
            />
            <span className="text-xs font-medium text-red-primary">
              {translate("correct_passcode")}
            </span>
            <span className="text-xs font-medium text-green-primary">
              {translate("incorrect_passcode")}
            </span>
          </div>
          <ButtonSubmitPrimary
            className={cn(
              "w-full",
              code?.length !== 6
                ? "pointer-events-none select-none bg-gray-third text-txtprimary"
                : "pointer-events-auto select-auto bg-txtthird text-white"
            )}
            disabled={code?.length !== 6}
            onClickHandle={() => handleContinue()}
          >
            {translate("continue")}
          </ButtonSubmitPrimary>
        </div>
      </div>
    </div>
  );
};

export default NewPasscodeForm;
