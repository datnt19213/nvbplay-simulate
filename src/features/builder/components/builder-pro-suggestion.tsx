"use client";
import React from "react";
import EmptyItem from "@/components/base-components/cta/empty-item";
import {EmptyCollectionBuilder} from "@/assets/images";
import {translate} from "@/utilities/translator";
import {EquipmentSetCard} from "../elements/equipment-set-card";

export const BuilderProSuggestion = () => {
  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 min-[1360px]:grid-cols-4 w-full  gap-4">
      {Array.from({length: 8}).map((_, index) => (
        <EquipmentSetCard
          outOfStock={index % 5 === 0 ? true : false}
          key={index}
          data={undefined}
          replaceUpdateDateToRegularPrice={true}
          viewDetailButton={false}
          allowSaveEquipment={true}
          by={"pro"}
        />
      ))}
      {!true && (
        <EmptyItem
          image={EmptyCollectionBuilder.src}
          title={translate("empty_list_of_stored_equipment")}
          className="col-span-4"
        />
      )}
    </div>
  );
};
