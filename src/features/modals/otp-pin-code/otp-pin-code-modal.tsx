"use client"
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {OtpInput} from "@/components/base-components/input";
import Modal from "@/components/base-components/modal";
import {toastNVB} from "@/components/base-components/toast";
import {Icon} from "@/components/common-components";
import {SettingItem} from "@/features/security/elements";
import {useWindowSize} from "@/hooks";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {
  setPinSmartOtpModal,
  setPinSmartOtpCodeAuthenticationModal,
} from "@/stores/profile";
import {translate} from "@/utilities/translator";
import {ChevronRight} from "lucide-react";
import React from "react";
import {useSelector, useDispatch} from "react-redux";

export const OtpPinCodeModal = () => {
  const {pinSmartOtpCodeAuthenticationModal} = useSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useDispatch();
  const [width, height] = useWindowSize();
  return (
    <Modal
      verticalPos={width < 1200 ? "bottom" : "center"}
      wrapperClass={cn("z-[51]")}
      size={width < 1200 ? "full" : "max-w-[480px]"}
      onClose={() => dispatch(setPinSmartOtpCodeAuthenticationModal(false))}
      open={pinSmartOtpCodeAuthenticationModal}
    >
      <div className="min-h-[432px] flex flex-col justify-between items-center w-full">
        <div className="flex flex-col gap-4 w-full items-center">
          <span className="text-txtfifth font-semibold"></span>
          <span className="text-gray-icon text-sm font-medium"></span>
          <OtpInput
            length={6}
            inputClassName="text-[20px] font-semibold"
            onChange={(otp) => toastNVB({type: "info", msg: otp})}
          />
          <span className="text-sm font-medium text-txtthird cursor-pointer">
            {translate("resend_code")}
          </span>
        </div>
        <ButtonSubmitPrimary>{translate("continue")}</ButtonSubmitPrimary>
      </div>
    </Modal>
  );
};
