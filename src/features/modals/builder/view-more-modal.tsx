import Modal from "@/components/base-components/modal";
import {useWindowSize} from "@/hooks";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {
  setChooseSuitableFeatureModal,
  setSaveEquipmentModal,
  setShareEquipmentModal,
  setViewMoreModal,
} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Icon} from "@/components/common-components";
import {useMediaQuery} from "@/hooks/use-media-query";

export const ViewMoreModal = () => {
  const {viewMoreModal} = useSelector((state: RootState) => state.builder);

  const dispatch = useDispatch();
  const [width, height] = useWindowSize();
  const isMobile = useMediaQuery("(max-width: 1200px)");

  const handleCloseModal = () => {
    dispatch(setViewMoreModal(false));
  };

  return (
    <Modal
      title={translate("see_more")}
      titleClass="text-center font-semibold text-txtprimary border-b border-gray-border pb-2"
      verticalPos={width < 1200 ? "bottom" : "center"}
      wrapperClass={cn("z-[52] desktop:h-dvh desktop:top-0")}
      size={width < 1200 ? "full" : "max-w-[476px]"}
      onClose={() => handleCloseModal()}
      open={viewMoreModal}
      cancelButton={false}
    >
      <ViewMoreContentChoices />
    </Modal>
  );
};

export const ViewMoreContentChoices = () => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const dispatch = useDispatch();

  function handleDownloadEquipment(): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <div className=" gap-5 flex flex-col items-center w-full max-w-[412px] mx-auto">
      <div className="w-full p-1 flex flex-col gap-1">
        <div className="flex h-[54px] w-full gap-2 cursor-pointer">
          <Icon icon="lucide:credit-card" fontSize={24} />
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold text-sm text-txtprimary">
              {translate("equipment_installments")}
            </span>
            <span className="text-[11px] font-medium text-txtsecondary">
              {translate("pay_in_advance")} 99.000đ
            </span>
          </div>
        </div>
        <div className="flex h-[54px] w-full gap-2 cursor-pointer">
          <Icon icon="lucide:message-circle-more" fontSize={24} />
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold text-sm text-txtprimary">
              {translate("negotiate_on_price")}
            </span>
            <span className="text-[11px] font-medium text-txtsecondary">
              {translate("talk_to_the_store_to_get_preferential_prices")}{" "}
            </span>
          </div>
        </div>
        {!isMobile && (
          <hr className="w-full h-[1px] mx-auto border-gray-border" />
        )}
        <div
          className="flex h-[54px] w-full gap-2 cursor-pointer"
          onClick={() => dispatch(setShareEquipmentModal(true))}
        >
          <Icon icon="majesticons:share-line" fontSize={24} />
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold text-sm text-txtprimary">
              {translate("share_equipment")}
            </span>
            <span className="text-[11px] font-medium text-txtsecondary">
              {translate("share_the_equipment_set_to_your_friends")}
            </span>
          </div>
        </div>
        <div
          className="flex h-[54px] w-full gap-2 cursor-pointer"
          onClick={() => dispatch(setSaveEquipmentModal(true))}
        >
          <Icon icon="mi:save" fontSize={24} />
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold text-sm text-txtprimary">
              {translate("save_set_equipment")}
            </span>
            <span className="text-[11px] font-medium text-txtsecondary">
              {translate("add_to_your_saved_collection")}
            </span>
          </div>
        </div>
        <div
          className="flex h-[54px] w-full gap-2 cursor-pointer"
          onClick={() => handleDownloadEquipment()}
        >
          <Icon icon="lucide:file-down" fontSize={24} />
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold text-sm text-txtprimary">
              {translate("download_equipment")}
            </span>
            <span className="text-[11px] font-medium text-txtsecondary">
              {translate("download_with_xlsx_format")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
