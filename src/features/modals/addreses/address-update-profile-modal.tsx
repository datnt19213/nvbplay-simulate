import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import SelectInput from "@/components/base-components/input/select-input";
import TextInput from "@/components/base-components/input/text-input";
import Modal from "@/components/base-components/modal";
import RadioCard from "@/components/base-components/radios";
import {Checkbox} from "@/components/ui/checkbox";
import {
  useGetMutationUpdateAllDistricts,
  useGetMutationUpdateAllWards,
  useGetMutationUpdateAllCities,
  useMutationUpdateAddreses,
} from "@/hooks/queries/addresses";
import {useQueryUpdateGetAnAddreses} from "@/hooks/queries/addresses/use-get-an-addresses";
import {useFormValidator, REGEXS} from "@/hooks/validators";
import {transformAddressData} from "@/services/pdw";
import {RootState} from "@/stores";
import {
  setAddressUpdateFormData,
  setAddressUpdateIsDefault,
  setCitiesUpdate,
  setDistrictSelectedUpdate,
  setDistrictsUpdate,
  setProvinceSelectedUpdate,
  setWardsUpdate,
} from "@/stores/address-slice";
import {setAddressUpdateModal} from "@/stores/profile";
import {translate} from "@/utilities/translator";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const AddressUpdateProfileModal = () => {
  const {addressUpdateModal} = useSelector((state: RootState) => state.profile);
  const {
    isDefaultAddressUpdate,
    citiesUpdate,
    districtsUpdate,
    wardsUpdate,
    provinceSelectedUpdate,
    districtSelectedUpdate,
    wardSelectedUpdate,
    addressUpdateSelected,
  } = useSelector((state: RootState) => state.address);
  const dispatch = useDispatch();

  const {values, setValues, handleChange} = useFormValidator(
    {
      name: addressUpdateSelected && addressUpdateSelected.first_name,
      phone: addressUpdateSelected && addressUpdateSelected.phone,
      houseNumber: addressUpdateSelected && addressUpdateSelected.address_1,
      province: addressUpdateSelected && addressUpdateSelected.city,
      district: addressUpdateSelected && addressUpdateSelected.province,
      ward: addressUpdateSelected && addressUpdateSelected.ward,
      type: addressUpdateSelected && addressUpdateSelected.metadata.type,
    },
    {
      name: {
        errorMessage: `${translate("please_enter_name")}`,
      },
      phone: {
        pattern: REGEXS.phone,
        errorMessage: `${translate("the_phone_number_is_invalid")}`,
      },
      houseNumber: {
        errorMessage: `${translate("please_enter_house_number_building_street")}`,
      },
      province: {
        errorMessage: `${translate("please_select_province_city")}`,
      },
      district: {
        errorMessage: `${translate("please_select_a_district")}`,
      },
      ward: {
        errorMessage: `${translate("please_select_commune_ward")}`,
      },
      type: {
        errorMessage: `${translate("please_select_an_address_type")}`,
      },
    }
  );
  const {getCities, citiesData, citiesMutation} =
    useGetMutationUpdateAllCities();
  const {getDistrictFnc} = useGetMutationUpdateAllDistricts();
  const {getWardFnc} = useGetMutationUpdateAllWards();
  const {updateFnc, isPending} = useMutationUpdateAddreses();

  useEffect(() => {
    if (addressUpdateSelected) {
      setValues((prevValues) => ({
        ...prevValues,
        name: addressUpdateSelected.first_name || "",
        phone: addressUpdateSelected.phone || "",
        houseNumber: addressUpdateSelected.address_1 || "",
        province: addressUpdateSelected.city || "",
        district: addressUpdateSelected.province || "",
        ward: addressUpdateSelected.ward || "",
        type: addressUpdateSelected.metadata?.type || "",
      }));

      dispatch(
        setAddressUpdateIsDefault(addressUpdateSelected?.is_default_shipping)
      );
      getCities();
      dispatch(
        setProvinceSelectedUpdate({
          id: addressUpdateSelected?.metadata?.city_id,
          label: addressUpdateSelected?.city,
          value: addressUpdateSelected?.city,
        })
      );
      dispatch(
        setDistrictSelectedUpdate({
          id: addressUpdateSelected?.metadata?.district_id,
          label: addressUpdateSelected?.province,
          value: addressUpdateSelected?.province,
        })
      );
    }
  }, [addressUpdateSelected]);

  useEffect(() => {
    if (provinceSelectedUpdate) {
      getDistrictFnc();
    }
  }, [provinceSelectedUpdate]);

  useEffect(() => {
    if (addressUpdateSelected?.metadata?.district_id) {
      getWardFnc(addressUpdateSelected.metadata?.district_id);
    }
  }, [addressUpdateSelected?.metadata?.district_id]);

  const handleUpdateAddress = async () => {
    const formData = {
      first_name: values.name,
      last_name: "",
      phone: values.phone,
      company: "",
      address_1: `${values.houseNumber}`,
      address_2: "",
      city: values.province,
      country_code: "vn",
      province: values.district,
      postal_code: "",
      address_name: values.name,
      is_default_shipping: isDefaultAddressUpdate,
      is_default_billing: false,
      metadata: {
        city_id: citiesUpdate.find(
          (city: any) => city.label === values.province
        )?.id,
        district_id: districtsUpdate.find(
          (district: any) => district.label === values.district
        )?.id,
        ward_id: wardsUpdate.find((ward: any) => ward.label === values.ward)
          ?.id,
        type: values.type,
      },
    };
    dispatch(setAddressUpdateFormData(formData));
    updateFnc();
    dispatch(setAddressUpdateModal(false));
  };

  const handleSelectProvinceChange = (item: any) => {
    dispatch(setProvinceSelectedUpdate(item));
    getDistrictFnc();
  };
  const handleSelectDistrictChange = (item: any) => {
    getWardFnc(item.id);
  };

  return (
    <Modal
      wrapperClass="!z-[49]"
      title={translate("update_address")}
      size="sm"
      titleClass="text-txt-primary font-semibold text-center"
      open={addressUpdateModal}
      onClose={() => dispatch(setAddressUpdateModal(false))}
      footerModalClass="flex justify-end"
      bodyClass="text-sm"
      cancelButton={
        <ButtonSubmitPrimary
          className="bg-gray-primary hover:bg-gray-primary text-txtprimary !w-fit"
          onClickHandle={() => dispatch(setAddressUpdateModal(false))}
        >
          {translate("cancel")}
        </ButtonSubmitPrimary>
      }
      submitButton={
        <ButtonSubmitPrimary
          className="bg-txtthird hover:bg-txtthird !w-fit"
          onClickHandle={() => handleUpdateAddress()}
          isLoading={isPending}
          disabled={isPending}
        >
          {translate("confirm")}
        </ButtonSubmitPrimary>
      }
    >
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("full_name")}
          </span>
          <TextInput
            type="text"
            className="!h-10 bg-gray-primary "
            placeholder={translate("full_name_of_recipient")}
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("phone_number")}
          </span>
          <TextInput
            type="number"
            value={values.phone}
            className="!h-10 bg-gray-primary "
            placeholder={translate("phone_number")}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("house_number")}
          </span>
          <TextInput
            type="text"
            value={values.houseNumber}
            className="!h-10 bg-gray-primary "
            placeholder={translate("house_number")}
            onChange={(e) => handleChange("houseNumber", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("province_city")}
          </span>
          <SelectInput
            className="min-h-10"
            placeholder={translate("province_city")}
            selectedValue={values.province || ""}
            options={citiesUpdate || []}
            onSelect={(val) => {
              handleSelectProvinceChange(val);
              handleChange("province", val);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("district")}
          </span>

          <SelectInput
            className="min-h-10"
            placeholder={translate("district")}
            options={districtsUpdate || []}
            selectedValue={values.district || ""}
            onSelect={(val) => {
              handleSelectDistrictChange(val);
              handleChange("district", val);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("ward_commune")}
          </span>
          <SelectInput
            className="min-h-10"
            placeholder={translate("ward_commune")}
            options={wardsUpdate || []}
            selectedValue={values.ward || ""}
            onSelect={(val) => {
              handleChange("ward", val);
            }}
          />
        </div>
        <div className="flex flex-col col-span-1 desktop:col-span-2 gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("address_type")}
          </span>
          <div className="gap-3 flex items-center">
            <RadioCard
              id={"house"}
              name={"type"}
              isChecked={values.type == "house"}
              handleEdit={() => handleChange("type", "house")}
              className="w-fit h-[37px] px-4 py-0 flex items-center justify-center"
            >
              {translate("house")}
            </RadioCard>
            <RadioCard
              id={"office"}
              name={"type"}
              isChecked={values.type == "office"}
              handleEdit={() => handleChange("type", "office")}
              className="w-fit h-[37px] px-4 py-0 flex items-center justify-center"
            >
              {translate("office")}
            </RadioCard>
          </div>
        </div>
        <label
          htmlFor="default-address"
          className="flex col-span-1 desktop:col-span-2 gap-3 cursor-pointer select-none"
        >
          <Checkbox
            id="default-address"
            checked={isDefaultAddressUpdate}
            className="w-5 h-5 bg-gray-primary border rounded-md border-gray-border data-[state=checked]:bg-txtprimary"
            onCheckedChange={(checked: boolean) =>
              dispatch(setAddressUpdateIsDefault(checked))
            }
          />
          <span className="text-sm font-medium text-txtfifth">
            {translate("set_as_default_address")}
          </span>
        </label>
      </div>
    </Modal>
  );
};

export default AddressUpdateProfileModal;
