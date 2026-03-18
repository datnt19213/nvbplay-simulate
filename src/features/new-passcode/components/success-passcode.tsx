import {SuccessTick} from "@/assets/images";
import EmptyItem from "@/components/base-components/cta/empty-item";
import {translate} from "@/utilities/translator";
import React from "react";

const SuccessPasscode = () => {
  return (
    <EmptyItem
      image={SuccessTick.src}
      title={translate("congratulations")}
      subTitle={translate("you_have_successfully_set_the_smart_otp_pin")}
      isNavigable
      navigateUrl="/profile/personal-info/security"
    />
  );
};

export default SuccessPasscode;
