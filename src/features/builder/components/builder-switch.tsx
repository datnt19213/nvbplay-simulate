"use client";
import {RootState} from "@/stores";
import {setChangeSetupEquipmentModal} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

const BuilderSwitch = () => {
  const {changeSetupEquipment} = useSelector(
    (state: RootState) => state.builder
  );
  const dispatch = useDispatch();
  return (
    <div className="p-4 flex justify-between border-b border-gray-border">
      <div className="flex flex-col">
        <span className="text-txtprimary font-semibold text-xl">
          {changeSetupEquipment?.subject?.label || "-"}
        </span>
        <span className="text-gray-icon font-medium text-sm">
          {translate("level")}: {changeSetupEquipment?.level?.label || "-"}
        </span>
      </div>
      <span
        className="cursor-pointer text-txtfourth text-sm font-semibold select-none"
        onClick={() => dispatch(setChangeSetupEquipmentModal(true))}
      >
        {translate("change")}
      </span>
    </div>
  );
};

export default BuilderSwitch;
