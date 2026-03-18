import {ENUM} from "@/configs";
import {
  getGoShipCities,
  getGoShipDistricts,
  getGoShipWards,
} from "@/services/addresses";
import {transformAddressData} from "@/services/pdw";
import {RootState} from "@/stores";
import {setWardsCreate, setWardsUpdate} from "@/stores/address-slice";
import {keepPreviousData, useMutation, useQuery} from "@tanstack/react-query";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

export const useGetMutationCreateAllWards = () => {
  const dispatch = useDispatch();
  const {provinceSelectedCreate} = useSelector(
    (state: RootState) => state.address
  );
  const mutation = useMutation({
    mutationFn: (districtId: string) => {
      if (!districtId || !provinceSelectedCreate?.id) {
        return Promise.resolve([]);
      }
      return getGoShipWards(districtId, provinceSelectedCreate.id);
    },
    onSuccess: (data: any) => {
      dispatch(setWardsCreate(transformAddressData(data.data)));
    },
  });

  return {
    getWardFnc: (id: string) => {
      if (id) {
        mutation.mutate(id);
      }
    },
    wardData: mutation.data?.data || [],
    wardMutation: mutation,
  };
};
export const useGetMutationUpdateAllWards = () => {
  const {provinceSelectedUpdate, districtSelectedUpdate} = useSelector(
    (state: RootState) => state.address
  );
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (districtId: string) => {
      if (!districtId || !provinceSelectedUpdate?.id) {
        return Promise.resolve([]);
      }
      return getGoShipWards(districtId, provinceSelectedUpdate.id);
    },
    onSuccess: (data: any) => {
      dispatch(setWardsUpdate(transformAddressData(data.data)));
    },
  });

  return {
    getWardFnc: (id: string) => {
      if (id) {
        mutation.mutate(id);
      }
    },
    wardData: mutation.data?.data || [],
    wardMutation: mutation,
  };
};
