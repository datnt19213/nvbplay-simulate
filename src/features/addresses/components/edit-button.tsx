"use client";
import {setAddressUpdateSelected} from "@/stores/address-slice";
import {setAddressUpdateModal} from "@/stores/profile";
import {translate} from "@/utilities/translator";
import {PenBox} from "lucide-react";
import React from "react";
import {useDispatch} from "react-redux";

export const EditButton = ({data}: {data: any}) => {
  const dispatch = useDispatch();
  return (
    <span
      className="cursor-pointer text-sm font-semibold text-txtsecondary flex items-center gap-1"
      onClick={() => {
        dispatch(setAddressUpdateSelected(data));
        dispatch(setAddressUpdateModal(true));
      }}
    >
      <PenBox size={24} />
      {translate("edit")}
    </span>
  );
};
