"use client";
import BadgeIndicator from "@/components/base-components/badge-indicator";
import Modal from "@/components/base-components/modal";
import {Icon} from "@/components/common-components";
import {SettingItem} from "@/features/security/elements";
import {useWindowSize} from "@/hooks";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {
  setPinSmartOtpCodeAuthenticationModal,
  setPinSmartOtpModal,
} from "@/stores/profile";
import {translate} from "@/utilities/translator";
import {ChevronRight} from "lucide-react";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

export const SmartOtpModal = () => {
  const {pinSmartOtpModal} = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [width, height] = useWindowSize();
  return (
    <Modal
      verticalPos={width < 1200 ? "bottom" : "center"}
      title={
        <div className="flex gap-2">
          <span className="font-semibold text-txtprimary">
            {translate("smart_otp_pin_code")}
          </span>
          <BadgeIndicator
            reverse
            text={translate("turn_on")}
            wrapperClass="bg-[#D7FAE0]"
            indicatorClass="bg-[#3B8A3D] text-[#079449]"
          />
        </div>
      }
      wrapperClass={cn("z-[50]")}
      size={width < 1200 ? "full" : "max-w-[480px]"}
      onClose={() => dispatch(setPinSmartOtpModal(false))}
      open={pinSmartOtpModal}
    >
      <div className="min-h-[250px] flex flex-col w-full">
        <SettingItem
          onClick={() => dispatch(setPinSmartOtpCodeAuthenticationModal(true))}
          title={translate("change_smart_otp_pin_code")}
          description={""}
          leftIcon={<Icon icon="tabler:forms" fontSize={24} />}
          rightElement={<ChevronRight size={16} />}
        />
        <SettingItem
          title={translate("forgot_smart_otp_pin_code")}
          description={""}
          leftIcon={<Icon icon="tabler:help" fontSize={24} />}
          rightElement={<ChevronRight size={16} />}
        />
      </div>
    </Modal>
  );
};
