"use client";
import Dropzone from "@/components/base-components/dropzone";
import SelectInput from "@/components/base-components/input/select-input";
import TextInput from "@/components/base-components/input/text-input";
import Modal from "@/components/base-components/modal";
import Select from "@/components/base-components/select";
import {toastNVB} from "@/components/base-components/toast";
import {Icon} from "@/components/common-components";
import {Button} from "@/components/ui/button";
import {STYLES} from "@/configs";
import {useWindowSize} from "@/hooks";
import {useFormValidator} from "@/hooks/validators";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setSaveEquipmentModal} from "@/stores/builder-slice";
import {getImageDimensions, validateImageDimensions} from "@/utilities/image";
import {indexedDbAddItem} from "@/utilities/indexdb";
import {translate} from "@/utilities/translator";
import {Popover, PopoverTrigger, PopoverContent} from "@radix-ui/react-popover";
import {X} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export const SaveEquipmentModal = () => {
  const [width, height] = useWindowSize();
  const [imageValid, setImageValid] = useState(false);
  const {saveEquipmentModal} = useSelector((state: RootState) => state.builder);
  const dispatch = useDispatch();
  function handleCloseModal(): void {
    dispatch(setSaveEquipmentModal(false));
  }

  const {errors, handleChange, values, validateAllFields, setValues} =
    useFormValidator(
      {
        name: "",
        subject: "",
        level: "",
        image: null,
      },
      {
        name: {
          required: true,
          errorMessage: translate("please_enter_the_name_of_the_equipment"),
        },
        subject: {
          required: true,
          errorMessage: translate("please_choose_the_subject"),
        },
        level: {
          required: true,
          errorMessage: translate("please_choose_the_level"),
        },
        image: {
          required: true,
          errorMessage: translate("please_add_photos"),
        },
      }
    );

  useEffect(() => {
    if (!values.subject || !values.level) {
      setValues({
        name: "",
        subject: "Badminton",
        level: "Newbie",
        image: null,
      });
    }
  }, []);

  function handleClickUpload(): void {
    const fileInput = document.getElementById(
      "save-img-equipment"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  async function handleDroppedImage(file: File[]) {
    const {isValid} = await validateImageDimensions(file[0], 1200, 600);
    if (isValid) {
      setImageValid(true);
      handleChange("image", file);
    } else {
      setImageValid(false);
      toastNVB({
        type: "warning",
        msg: translate("the_image_size_does_not_match"),
      });
    }
  }

  const handleSaveEquipment = async () => {
    if (validateAllFields() && imageValid) {
      const res = await indexedDbAddItem({
        id: `saved-equipment${new Date().toISOString()}`,
        value: values,
      });
      if (res)
        toastNVB({
          type: "success",
          msg: translate("save_the_equipment_successfully"),
        });
    }
  };

  return (
    <Modal
      title={translate("save_equipment")}
      titleClass="text-center font-semibold text-txtprimary"
      verticalPos={width < 1200 ? "bottom" : "center"}
      wrapperClass={cn("z-[52] desktop:h-dvh desktop:top-0")}
      headerModalClass="border-b"
      footerModalClass="border-t gap-2 flex justify-end "
      size={width < 1200 ? "full" : "max-w-[560px]"}
      onClose={() => handleCloseModal()}
      open={saveEquipmentModal}
      cancelButton={
        <Button
          className={cn(
            STYLES.disableFocusVisible,
            "h-10 px-3 text-gray-icon bg-gray-border min-w-[120px] hover:bg-gray-border"
          )}
        >
          {translate("close")}
        </Button>
      }
      submitButton={
        <Button
          disabled={
            values.name == "" ||
            !values.name ||
            !values.subject ||
            !values.level ||
            !values.image
          }
          className={cn(
            STYLES.disableFocusVisible,
            "h-10 px-3 text-black/15 bg-black/5 hover:text-white min-w-[120px]"
          )}
          onClick={() => handleSaveEquipment()}
        >
          {translate("save")}
        </Button>
      }
    >
      <div className="flex flex-col w-full gap-5 px-2 py-4">
        <div className="flex flex-col gap-1 w-full">
          <span className="text-sm font-medium text-txtprimary">
            {translate("name_of_equipment")}
          </span>
          <TextInput
            className="h-10 bg-gray-primary text-gray-sixth"
            onChange={(e) => {
              handleChange("name", e.target.value);
            }}
            placeholder={translate("example_dynamic_summer_collection")}
            value={values.name}
          />
          {errors.name && values.name != "" && (
            <span className="text-xs font-medium text-red-primary">
              {errors.name}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-sm font-medium text-txtprimary">
              {translate("subject")}
            </span>
            <Select
              contentClass="z-[52]"
              actionButton={(data) => (
                <span className="text-txtprimary">{data?.name}</span>
              )}
              items={[
                {id: "0", value: "Badminton", name: "Badminton"},
                {id: "1", value: "Soccer", name: "Soccer"},
              ]}
              className={cn(
                STYLES.disableFocusVisible,
                "h-10 bg-gray-primary text-gray-sixth w-full"
              )}
              onSelected={(data) => handleChange("subject", data.value)}
            />
            {errors.subject && values.subject != "" && (
              <span className="text-xs font-medium text-red-primary">
                {errors.subject}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span className="text-sm font-medium text-txtprimary">
              {translate("level")}
            </span>
            <Select
              contentClass="z-[52]"
              actionButton={(data) => (
                <span className="text-txtprimary">{data?.name}</span>
              )}
              items={[
                {id: "0", value: "Newbie", name: "Newbie"},
                {id: "1", value: "Pro", name: "Pro"},
              ]}
              className={cn(
                STYLES.disableFocusVisible,
                "h-10 bg-gray-primary text-gray-sixth w-full"
              )}
              onSelected={(data) => handleChange("level", data.value)}
            />
            {errors.level && values.level != "" && (
              <span className="text-xs font-medium text-red-primary">
                {errors.level}
              </span>
            )}
          </div>
        </div>
        <div className="min-h-[232px] flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-txtprimary">
                {translate("cover_photo")}
              </span>
              <span className="font-medium text-xs text-txtsecondary text-start">
                1200x600px
              </span>
            </div>
            <span
              className="px-4 py-2 text-sm font-semibold text-center text-txtprimary select-none cursor-pointer rounded-lg bg-gray-border"
              onClick={() => handleClickUpload()}
            >
              {translate("upload")}
            </span>
          </div>
          <Dropzone
            containerClass="h-[212px] rounded-lg bg-gray-primary max-w-[375px] w-full relative overflow-hidden"
            id={"save-img-equipment"}
            accept="image/png, image/jpeg, image/jpg"
            onFilesDrop={(file) => handleDroppedImage(file)}
          >
            {(files) => (
              <div>
                {files && files.length > 0 ? (
                  <>
                    {imageValid && (
                      <img
                        className="object-cover w-auto h-[212px] "
                        src={URL.createObjectURL(files[0])}
                        alt="img-dropped"
                      />
                    )}
                    {!imageValid && (
                      <>
                        <div className="flex flex-col max-w-[127px] gap-2 w-full m-auto items-center justify-center">
                          <Icon
                            icon="tabler:photo"
                            fontSize={24}
                            color="#64646D"
                          />
                          <span className="font-medium text-xs text-txtsecondary text-center">
                            {translate(
                              "select_the_file_or_drag_the_image_here"
                            )}
                          </span>
                        </div>
                        <span className="max-w-[230px] mx-auto text-center text-xs font-medium text-red-primary">
                          {translate("the_image_size_does_not_match")}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col max-w-[127px] gap-2 w-full m-auto items-center justify-center">
                    <Icon icon="tabler:photo" fontSize={24} color="#64646D" />
                    <span className="font-medium text-xs text-txtsecondary text-center">
                      {translate("select_the_file_or_drag_the_image_here")}
                    </span>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    </Modal>
  );
};
