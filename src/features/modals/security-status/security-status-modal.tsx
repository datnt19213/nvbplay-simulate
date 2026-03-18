"use client";
import Modal from "@/components/base-components/modal";
import {RootState} from "@/stores";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {SecurityItem} from "./components/security-item";
import {translate} from "@/utilities/translator";
import {Check} from "lucide-react";
import {CheckAction} from "./elements";
import {useWindowSize} from "@/hooks";
import {setSecurityStatusModal} from "@/stores/profile";

export const SecurityStatusModal = () => {
  const {securityStatusModal} = useSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useDispatch();
  const [width, height] = useWindowSize();
  return (
    <Modal
      onClose={() => dispatch(setSecurityStatusModal(false))}
      title={translate("secure_status")}
      titleClass="text-center font-semibold text-txtprimary"
      verticalPos={width < 1200 ? "bottom" : "center"}
      size={width < 1200 ? "full" : "max-w-[480px]"}
      open={securityStatusModal}
    >
      <div className="flex flex-col py-2 px-4 w-full">
        <SecurityItem
          icon={<CheckAction active />}
          title={translate("sign_in_with_pin")}
          description={translate("request_password_when_sign_in")}
        />
        <SecurityItem
          icon={<CheckAction active />}
          title={translate("authentication_with_smart_otp")}
          description={translate("security_payment_process")}
          end={
            <span className="min-w-[112px] text-xs font-semibold text-red-primary">
              {translate("just_active_on_nvb_play_app")}
            </span>
          }
        />
        <SecurityItem
          icon={<CheckAction />}
          title={translate("sign_in_with_pin")}
          description={translate("request_password_when_sign_in")}
        />
        <SecurityItem
          icon={<CheckAction />}
          title={translate("sign_in_with_pin")}
          description={translate("request_password_when_sign_in")}
        />
      </div>
    </Modal>
  );
};
