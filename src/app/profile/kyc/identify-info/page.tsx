import {KycIdentifyInfo} from "@/features/kyc";
import React from "react";

const IdentifyInfo = () => {
  return (
    <div className="w-full max-w-[640px] flex flex-col gap-8 mx-auto">
      <KycIdentifyInfo />
    </div>
  );
};

export default IdentifyInfo;
