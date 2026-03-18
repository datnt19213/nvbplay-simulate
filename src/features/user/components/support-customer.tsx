import React from "react";
import {ButtonCard} from "../elements";
import {translate} from "@/utilities/translator";
import {HeadphoneFill, MessageFill} from "@/assets/icons";

const SupportCustomer = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <ButtonCard
        icon={<img src={HeadphoneFill.src} className="w-[32px] h-[32px]" />}
        label={translate("support_customer")}
      />
      <ButtonCard
        icon={<img src={MessageFill.src} className="w-[32px] h-[32px]" />}
        label={translate("chat_with_nvb")}
      />
    </div>
  );
};

export default SupportCustomer;
