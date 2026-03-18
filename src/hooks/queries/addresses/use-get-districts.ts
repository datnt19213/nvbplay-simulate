import React, {useEffect} from "react";
import {getGoShipDistricts} from "@/services/addresses";
import {RootState} from "@/stores";
import {useMutation} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";
import {transformAddressData} from "@/services/pdw";
import {setDistrictsCreate, setDistrictsUpdate} from "@/stores/address-slice";

export const useGetMutationCreateAllDistricts = () => {
  const dispatch = useDispatch();
  const {provinceSelectedCreate} = useSelector(
    (state: RootState) => state.address
  );
  const mutation = useMutation({
    mutationFn: () =>
      provinceSelectedCreate
        ? getGoShipDistricts(provinceSelectedCreate.id)
        : Promise.resolve([]),
    onSuccess: (data) => {
      dispatch(setDistrictsCreate(transformAddressData(data.data)));
    },
  });

  return {
    getDistrictFnc: mutation.mutate,
    districtData: mutation.data?.data || [],
    districtMutation: mutation,
  };
};
export const useGetMutationUpdateAllDistricts = () => {
  const dispatch = useDispatch();
  const {provinceSelectedUpdate} = useSelector(
    (state: RootState) => state.address
  );
  const mutation = useMutation({
    mutationFn: () =>
      provinceSelectedUpdate
        ? getGoShipDistricts(provinceSelectedUpdate.id)
        : Promise.resolve([]),
    onSuccess: (data) => {
      dispatch(setDistrictsUpdate(transformAddressData(data.data)));
    },
  });

  return {
    getDistrictFnc: mutation.mutate,
    districtData: mutation.data?.data || [],
    districtMutation: mutation,
  };
};
