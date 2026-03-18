import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {Icon} from "@/components/common-components";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {translate} from "@/utilities/translator";
import React, {FC} from "react";

type EquipmentSetButtonProps = {
  viewDetail?: boolean;
  allowSaveEquipment?: boolean;
};
export const EquipmentSetButton: FC<EquipmentSetButtonProps> = ({
  viewDetail = true,
  allowSaveEquipment = false,
}) => {
  function handleViewDetailEquipment(): void {
    // throw new Error('Function not implemented.')
  }

  function handleDownloadEquipment(): void {
    // throw new Error("Function not implemented.");
  }

  function handlePreviewEquipment(): void {
    // throw new Error("Function not implemented.");
  }

  function handleCopyLink(): void {
    // throw new Error("Function not implemented.");
  }

  function handleBuyingEquipment(): void {
    // throw new Error("Function not implemented.");
  }

  function handleSaveEquipmentToCollection(): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <div className="flex gap-2 items-center w-full">
      {!viewDetail && (
        <ButtonSubmitPrimary
          className="w-full bg-[#090D14] text-white hover:bg-[#090D14] "
          onClick={() => handleBuyingEquipment()}
        >
          {translate("add_to_cart")}
        </ButtonSubmitPrimary>
      )}
      {viewDetail && (
        <ButtonSubmitPrimary
          className="w-full bg-gray-primary hover:bg-gray-primary text-gray-icon"
          onClick={() => handleViewDetailEquipment()}
        >
          {translate("details")}
        </ButtonSubmitPrimary>
      )}
      <Popover>
        <PopoverTrigger className="bg-gray-primary h-10 px-4 rounded-lg hover:bg-gray-primary">
          <Icon icon="tabler:dots" fontSize={24} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="border-none p-4 rounded-2xl shadow-[0px_4px_16px_rgba(0,0,0,0.1)] max-w-[297px] w-full min-h-fit"
        >
          <div
            className="flex h-[54px] w-full gap-2 cursor-pointer py-2"
            onClick={() => handlePreviewEquipment()}
          >
            <Icon icon="lucide:eye" fontSize={20} />
            <div className="w-full flex flex-col gap-1">
              <span className="font-semibold text-sm text-txtprimary">
                {translate("preview_the_equipment")}
              </span>
              <span className="text-[11px] font-medium text-txtsecondary">
                {translate("preview_the_products_in_the_equipment_set")}
              </span>
            </div>
          </div>
          <div
            className="flex h-[54px] w-full gap-2 cursor-pointer py-2"
            onClick={() => handleCopyLink()}
          >
            <Icon icon="lucide:copy" fontSize={20} />
            <div className="w-full flex flex-col gap-1">
              <span className="font-semibold text-sm text-txtprimary">
                {translate("copy_link")}
              </span>
              <span className="text-[11px] font-medium text-txtsecondary">
                {translate("copy_and_share_equipment_for_others")}
              </span>
            </div>
          </div>
          {allowSaveEquipment && (
            <div
              className="flex h-[54px] w-full gap-2 cursor-pointer py-2"
              onClick={() => handleSaveEquipmentToCollection()}
            >
              <Icon icon="mi:save" fontSize={20} />
              <div className="w-full flex flex-col gap-1">
                <span className="font-semibold text-sm text-txtprimary">
                  {translate("save_set_equipment")}
                </span>
                <span className="text-[11px] font-medium text-txtsecondary">
                  {translate("add_to_your_saved_collection")}
                </span>
              </div>
            </div>
          )}
          <div
            className="flex h-[54px] w-full gap-2 cursor-pointer py-2"
            onClick={() => handleDownloadEquipment()}
          >
            <Icon icon="lucide:file-down" fontSize={20} />
            <div className="w-full flex flex-col gap-1">
              <span className="font-semibold text-sm text-txtprimary">
                {translate("download_equipment")}
              </span>
              <span className="text-[11px] font-medium text-txtsecondary">
                {translate("download_with_xlsx_format")}
              </span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
