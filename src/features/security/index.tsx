"use client";
import {Icon} from "@/components/common-components";
import {translate} from "@/utilities/translator";
import {ChevronRight} from "lucide-react";
import React, {useState} from "react";
import {SettingItem} from "./elements";
import {Switch} from "@/components/ui/switch";
import {cn} from "@/lib/utils";
import {Password02} from "@/assets/icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores";
import {
  setPasscodeModal,
  setPinSmartOtpModal,
  setSecurityStatusModal,
} from "@/stores/profile";
import {ProgressCircle} from "@/components/base-components/progress";

export const SecurityStatus = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="flex w-full items-center justify-between bg-white p-4 rounded-lg gap-3 cursor-pointer animate-fade-up"
      onClick={() => dispatch(setSecurityStatusModal(true))}
    >
      <div className="flex gap-2 items-center">
        <div className="relative flex items-center justify-center">
          <ProgressCircle
            dashCount={4}
            radius={24}
            dashColorList={["#E59900", "#E59900", "#EBEBF0", "#EBEBF0"]}
          />
          <span className="absolute font-bold text-orange-primary">2/4</span>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-sm flex items-center">
            {translate("secure_status")}:{" "}
            <span className="text-orange-primary font-semibold ml-1">
              {translate("medium")}
            </span>
          </div>
          <span className="font-medium text-xs text-gray-icon">
            {translate(
              "to_enhance_account_protection_you_should_add_security_methods"
            )}
          </span>
        </div>
      </div>
      <ChevronRight size={16} />
    </div>
  );
};

export const SignInSettings = () => {
  const [isOn, setIsOn] = useState(false);
  const dispatch = useDispatch();
  const handleClick = (key: string) => {
    if (key === "passcode_code") {
      dispatch(setPasscodeModal(true));
    }
    if (key === "automatically_locked_by_passcode") {
    }
    if (key === "sign_in_by_biometric") {
    }
    if (key === "sign_in_with_fingerprints") {
    }
  };
  return (
    <div className="w-full flex flex-col gap-2 animate-fade-up animate-delay-100">
      <span className="font-semibold">{translate("sign_in_settings")}</span>
      <div className="w-full flex flex-col bg-white py-1 px-4 rounded-lg select-none">
        <SettingItem
          description="request_password_when_sign_in"
          leftIcon="tabler:lock"
          title="sign_in_with_passcode"
          rightElement={
            <Switch
              className="data-[state=checked]:bg-blue-primary"
              onCheckedChange={(checked) => setIsOn(checked)}
            />
          }
        />
        <SettingItem
          className="cursor-pointer"
          onClick={() => handleClick("passcode_code")}
          description="request_password_when_sign_in"
          leftIcon="tabler:shield-lock"
          title="passcode_code"
          rightElement={<ChevronRight size={16} />}
          active={isOn}
        />
        <SettingItem
          className="cursor-pointer"
          onClick={() => handleClick("automatically_locked_by_passcode")}
          description="automatically_lock_when_not_in_use"
          leftIcon="tabler:lock-square"
          title="automatically_locked_by_passcode"
          rightElement={
            <div
              className={cn(
                "flex items-center gap-2 ",
                isOn ? "text-blue-primary" : "text-txtprimary"
              )}
            >
              30 {translate("seconds")}
              <ChevronRight size={16} />
            </div>
          }
          active={isOn}
        />
        <SettingItem
          className="cursor-pointer"
          onClick={() => handleClick("sign_in_by_biometric")}
          description="use_instead_of_the_created_passcode"
          leftIcon="tabler:face-id"
          title="sign_in_by_biometric"
          rightElement={<ChevronRight size={16} />}
          active={isOn}
        />
        <SettingItem
          className="cursor-pointer"
          onClick={() => handleClick("sign_in_with_fingerprints")}
          description="use_instead_of_the_created_passcode"
          leftIcon="tabler:shield-lock"
          title="sign_in_with_fingerprints"
          rightElement={
            <Switch className="data-[state=checked]:bg-blue-primary" />
          }
          active={isOn}
        />
      </div>
    </div>
  );
};
export const AuthenticationTransaction = () => {
  const [isOn, setIsOn] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="w-full flex desktop:hidden flex-col gap-2 animate-fade-up animate-delay-100">
      <span className="font-semibold">
        {translate("transaction_authentication")}
      </span>
      <div className="w-full flex flex-col bg-white py-1 px-4 rounded-lg">
        <SettingItem
          description="use_smartotp_for_transaction_authentication"
          leftIcon={<img src={Password02.src} className="w-6 h-auto" />}
          title="use_smartotp"
          rightElement={
            <Switch
              className="data-[state=checked]:bg-blue-primary"
              onCheckedChange={(checked) => setIsOn(checked)}
            />
          }
        />
        <SettingItem
          onClick={() => dispatch(setPinSmartOtpModal(true))}
          className="cursor-pointer"
          description="ajust_and_recover_the_smartotp_pin"
          leftIcon="tabler:barcode"
          title="smartotp_pin"
          rightElement={<ChevronRight size={16} />}
          active={isOn}
        />
      </div>
    </div>
  );
};
