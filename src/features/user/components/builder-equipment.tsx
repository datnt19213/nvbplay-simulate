import {ShirtFill} from "@/assets/icons";
import {Icon} from "@/components/common-components";
import {translate} from "@/utilities/translator";
import {ChevronRight} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";

const BuilderEquipment = () => {
  const router = useRouter();
  return (
    <div className="bg-white w-full rounded-lg flex flex-col gap-4 p-4">
      <div
        className="flex items-center justify-between"
        onClick={() => router.push("/builder/build-new")}
      >
        <div className="flex items-center gap-2">
          <img src={ShirtFill.src} alt="shirt-fill" className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-txtfifth">
              {translate("build_equipment")}
            </span>
            <span className="text-xs font-medium text-gray-icon">
              {translate("customize_with_exclusive_features")}
            </span>
          </div>
        </div>
        <ChevronRight size={20} />
      </div>
      <hr className="w-full h-[1px] bg-gray-icon" />
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-sixth">
            {translate("created")}
          </span>
          <div className="flex items-center gap-1 font-semibold text-txtprimary">
            5
            <span className="text-xs font-medium text-txtfifth">
              {translate("equipment")}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-sixth">
            {translate("saved")}
          </span>
          <div className="flex items-center gap-1 font-semibold text-txtprimary">
            12
            <span className="text-xs font-medium text-txtfifth">
              {translate("collection")}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-sixth">
            {translate("type_of_account")}
          </span>
          <div className="flex items-center gap-1 font-semibold text-txtprimary">
            Pro
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderEquipment;
