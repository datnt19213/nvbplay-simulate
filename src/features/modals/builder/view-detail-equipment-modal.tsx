import {Batminton} from "@/assets/images";
import Image from "@/components/base-components/images/image";
import Modal from "@/components/base-components/modal";
import {Button} from "@/components/ui/button";
import {STYLES} from "@/configs";
import {useWindowSize} from "@/hooks";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setViewDetailEquipmentSetModal} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

export const ViewDetailEquipmentModal = () => {
  const {viewDetailEquipmentSetModal} = useSelector(
    (state: RootState) => state.builder
  );
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();
  function handleCloseModal(): void {
    dispatch(setViewDetailEquipmentSetModal(false));
  }

  function handleAddtoCart(): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <Modal
      title={"NVBPLAY Spring Collection"}
      titleClass="text-center font-semibold text-txtprimary"
      verticalPos={width < 1200 ? "bottom" : "center"}
      wrapperClass={cn("z-[52] desktop:h-dvh desktop:top-0")}
      headerModalClass="border-b"
      footerModalClass="border-t min-h-[72px] flex items-center"
      size={width < 1200 ? "full" : "max-w-[560px]"}
      onClose={() => handleCloseModal()}
      open={viewDetailEquipmentSetModal}
      cancelButton={false}
      submitButton={
        <div className="flex flex-col desktop:flex-row w-full justify-between gap-2">
          <div className="flex flex-row items-center desktop:items-start desktop:flex-col w-full justify-between desktop:justify-center">
            <span className="font-medium text-sm text-gray-icon">
              {translate("provisional")}
            </span>
            <span className="font-bold text-lg text-txtthird">100.000ð</span>
          </div>
          <div className="flex justify-between desktop:justify-end items-center gap-2">
            <Button
              onClick={() => handleCloseModal()}
              className={cn(
                STYLES.disableFocusVisible,
                "h-10 w-full desktop:w-auto min-w-[120px] px-3 text-gray-icon bg-gray-border hover:bg-gray-border"
              )}
            >
              {translate("close")}
            </Button>
            <Button
              className={cn(
                STYLES.disableFocusVisible,
                "h-10 w-full desktop:w-auto min-w-[120px] text-nowrap px-3 bg-[#090D14] rounded-lg text-white hover:bg-[#090D14] hover:text-white"
              )}
              onClick={() => handleAddtoCart()}
            >
              {translate("add_to_cart")}
            </Button>
          </div>
        </div>
      }
    >
      <div className="w-full max-h-[368px] overflow-y-scroll scrollbar-none">
        {Array.from({length: 10}).map((_, index) => (
          <ItemsOfEquipmentSet key={index} />
        ))}
      </div>
    </Modal>
  );
};

const ItemsOfEquipmentSet = (item?: any) => {
  return (
    <div className="flex gap-2 desktop:gap-5 py-4">
      <div className="w-[calc(100%-140px)] flex gap-3 h-[72px] self-center">
        <Image
          src={item?.thumbnail ? item.thumbnail : Batminton.src}
          alt="product"
          className="aspect-square rounded-lg border h-[72px] min-w-[72px]"
          classNameImage="h-full w-auto object-cover"
        />
        <div className="flex flex-col w-full justify-start">
          <span className="font-medium text-sm text-txtprimary line-clamp-1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <span className="font-medium text-sm text-txtsecondary line-clamp-1">
            Lorem ipsum
          </span>
          <span className="font-medium text-sm text-txtsecondary">x{1}</span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end min-w-[120px] self-end">
        <span className="font-medium text-sm text-gray-icon line-through">
          1.900.000ð
        </span>
        <span className="font-bold text-txtfifth truncate">600.000ð</span>
      </div>
    </div>
  );
};
