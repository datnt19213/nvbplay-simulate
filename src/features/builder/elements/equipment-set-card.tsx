"use client";
import {YellowCrown} from "@/assets/icons";
import {Batminton, Logo} from "@/assets/images";
import {DarkOverlayTransparent} from "@/components/base-components/overlays";
import {translate} from "@/utilities/translator";
import {Eye} from "lucide-react";
import React, {FC} from "react";
import {EquipmentSetImageList} from "./equipment-image";
import {EquipmentSetButton} from "./equipment-set-button";
import {EquipmentSetCreateddBy} from "./equipment-set-created-by";
import {useDispatch} from "react-redux";
import {setViewDetailEquipmentSetModal} from "@/stores/builder-slice";
type EquipmentSetCardProps = {
  by?: "store" | "pro";
  outOfStock?: boolean;
  data: any;
  replaceUpdateDateToRegularPrice?: boolean;
  viewDetailButton?: boolean;
  allowSaveEquipment?: boolean;
};
export const EquipmentSetCard: FC<EquipmentSetCardProps> = ({
  by,
  data,
  outOfStock = false,
  replaceUpdateDateToRegularPrice = true,
  viewDetailButton = true,
  allowSaveEquipment = false,
}) => {
  return (
    <div className="min-h-[425px] w-full rounded-lg bg-white overflow-hidden">
      <CollectionImage
        data={data}
        by={by}
        src={Batminton.src}
        outOfStock={outOfStock}
        tags={["Cầu lông", "Người mới"]}
      />
      <div className="flex flex-col gap-3 p-3 w-full">
        <EquipmentSetCreateddBy
          created_by={"User AbcXyz"}
          by={by}
          avatar={Logo.src}
        />
        <EquipmentSetImageList
          images={[
            Batminton.src,
            Batminton.src,
            Batminton.src,
            Batminton.src,
            Batminton.src,
          ]}
        />
        <div className="flex flex-col w-full gap-1">
          <div className="flex flex-col w-full">
            <span className="text-sm font-semibold text-txtprimary text-nowrap truncate">
              NVB Play Spring Collection
            </span>
            {!replaceUpdateDateToRegularPrice && (
              <span className="text-sm font-medium text-gray-icon text-nowrap truncate">
                {translate("update")}:11/04/2024
              </span>
            )}
          </div>
          {replaceUpdateDateToRegularPrice && (
            <div className="flex flex-col w-full">
              <span className="text-lg font-bold text-txtthird truncate text-nowrap">
                14.350.000 đ{/* sale price */}
              </span>
              <div className="flex justify-between text-sm font-medium text-gray-icon text-nowrap truncate w-full">
                <span className="line-through">50.350.000 đ</span>
                {/* regular price */}
                <span className="text-nowrap">{translate("sold")}:123</span>
              </div>
            </div>
          )}
          {!replaceUpdateDateToRegularPrice && (
            <span className="text-lg font-bold text-txtthird truncate text-nowrap">
              14.350.000 đ{/* regular price */}
            </span>
          )}
        </div>
        <EquipmentSetButton
          allowSaveEquipment={allowSaveEquipment}
          viewDetail={viewDetailButton}
        />
      </div>
    </div>
  );
};

type CollectionImageProps = {
  by?: "store" | "pro";
  tags?: string[];
  src?: string;
  outOfStock?: boolean;
  data?: any;
};

const CollectionImage: FC<CollectionImageProps> = ({
  data,
  by,
  src = Batminton.src,
  tags,
  outOfStock = false,
}) => {
  const dispatch = useDispatch();
  function handleShowDetailModal() {
    dispatch(setViewDetailEquipmentSetModal(true));
  }

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[160px] rounded-lg overflow-hidden relative group"
    >
      {!outOfStock && (
        <DarkOverlayTransparent
          className="group-hover:!opacity-100 !opacity-0 group-hover:cursor-pointer transition-opacity duration-300 z-[2]"
          open={!outOfStock}
          onClick={() => handleShowDetailModal()}
        >
          <div className="cursor-pointer pointer-events-auto flex items-center gap-2">
            <Eye size={24} />
            &nbsp;{translate("preview")}
          </div>
        </DarkOverlayTransparent>
      )}
      {outOfStock && (
        <DarkOverlayTransparent
          opacity={0.7}
          className="z-[2] "
          open={outOfStock}
        >
          {translate("products_out_of_stock_temporary")}
        </DarkOverlayTransparent>
      )}
      <div className="z-[1] absolute p-3 top-0 left-0 w-full h-full flex gap-2 justify-between">
        <div className="flex gap-2 items-start overflow-x-scroll w-full scrollbar-none">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="text-white text-xs flex items-center justify-center font-semibold bg-txtprimary h-[22px] px-1.5 rounded truncate"
            >
              {tag}
            </span>
          ))}
        </div>
        {by === "pro" && (
          <div className="min-w-fit text-nowrap flex-nowrap h-[22px] px-1.5 bg-txtprimary rounded flex gap-1 items-center justify-center">
            <img
              src={YellowCrown.src}
              alt="crown-image"
              className="h-[12px] object-contain"
            />
            <span className="text-transparent text-xs font-semibold bg-gradient-to-r from-[#FCE7D2] via-[#FCE7D2] to-[#FCE7D2] bg-clip-text">
              {translate("suggest_pro")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
