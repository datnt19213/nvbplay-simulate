import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import SelectInput from "@/components/base-components/input/select-input";
import Modal from "@/components/base-components/modal";
import {useWindowSize} from "@/hooks";
import {useFormValidator} from "@/hooks/validators";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {
  setChangeSetupEquipment,
  setChangeSetupEquipmentModal,
} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import React from "react";
import {useSelector, useDispatch} from "react-redux";

export const ChangeSetupEquipmentModal = () => {
  const {changeSetupEquipmentModal, changeSetupEquipment} = useSelector(
    (state: RootState) => state.builder
  );
  const {errors, values, validateAllFields, handleChange} = useFormValidator(
    {
      level: {},
      subject: {},
    },
    {
      level: {
        required: true,
        errorMessage: translate("please_enter_valid_all_fields"),
      },
      subject: {
        required: true,
        errorMessage: translate("please_enter_valid_all_fields"),
      },
    }
  );

  const handleSubmit = () => {
    if (validateAllFields()) {
      dispatch(
        setChangeSetupEquipment({
          level: values.level,
          subject: values.subject,
        })
      );
      dispatch(setChangeSetupEquipmentModal(false));
    }
  };

  const dispatch = useDispatch();
  const [width, height] = useWindowSize();
  return (
    <Modal
      title={translate("change_of_equipment_setup")}
      titleClass="text-center font-semibold"
      verticalPos={width < 1200 ? "bottom" : "center"}
      wrapperClass={cn("z-[52] desktop:h-dvh desktop:top-0")}
      size={width < 1200 ? "full" : "max-w-[400px]"}
      onClose={() => dispatch(setChangeSetupEquipmentModal(false))}
      open={changeSetupEquipmentModal}
      cancelButton={false}
      submitButton={
        <ButtonSubmitPrimary className="px-5" onClickHandle={handleSubmit}>
          {translate("apply")}
        </ButtonSubmitPrimary>
      }
    >
      <div className=" gap-4 flex flex-col justify-center items-center w-full pb-3">
        <div className="flex flex-col w-full gap-2">
          <span className="text-sm font-semibold text-txtprimary">
            {translate("subject")}
          </span>
          <SelectInput
            options={[{id: 1, label: "Subject 1", value: "Subject 1"}]}
            className="w-full bg-gray-primary"
            contentClassName="z-[53]"
            placeholder={translate("subject")}
            selectedValue={changeSetupEquipment?.subject?.value}
            onSelect={(value) => {
              handleChange("subject", value);
            }}
          />
          {values.subject && errors.subject && (
            <div className="text-red-600 text-xs">{errors.subject}</div>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <span className="text-sm font-semibold text-txtprimary">
            {translate("your_level")}
          </span>
          <SelectInput
            options={[{id: 1, label: "Newbie", value: "Newbie"}]}
            placeholder={translate("your_level")}
            className="w-full bg-gray-primary"
            contentClassName="z-[53]"
            selectedValue={changeSetupEquipment?.level?.value}
            onSelect={(value) => {
              handleChange("level", value);
            }}
          />
          {values.level && errors.level && (
            <div className="text-red-600 text-xs">{errors.level}</div>
          )}
        </div>
      </div>
    </Modal>
  );
};
