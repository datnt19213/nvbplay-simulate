"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {setAddressDeletedSelected} from "@/stores/address-slice";
import {setAddressDeleteModal} from "@/stores/profile";
import {Trash2} from "lucide-react";
import React from "react";
import {useDispatch} from "react-redux";

export const RemoveButton = ({id}: {id: any}) => {
  const dispatch = useDispatch();
  return (
    <ButtonSubmitPrimary
      onClickHandle={() => {
        dispatch(setAddressDeletedSelected(id));
        dispatch(setAddressDeleteModal(true));
      }}
      className="h-10 w-10 !p-0 flex justify-center items-center aspect-square bg-white hover:bg-white"
    >
      <Trash2 size={24} className="text-red-primary" />
    </ButtonSubmitPrimary>
  );
};
