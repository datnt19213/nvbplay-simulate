import {ENUM} from "@/configs";
import {getGoShipCities} from "@/services/addresses";
import {transformAddressData} from "@/services/pdw";
import {setCitiesCreate, setCitiesUpdate} from "@/stores/address-slice";
import {keepPreviousData, useMutation, useQuery} from "@tanstack/react-query";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

export const useGetMutationCreateAllCities = () => {
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: () => getGoShipCities(),
    onSuccess: (data: any) => {
      dispatch(setCitiesCreate(transformAddressData(data?.data)));
    },
  });

  return {
    getCities: mutation.mutate,
    citesData: mutation.data,
    citiesMutation: mutation,
  };
};
export const useGetMutationUpdateAllCities = () => {
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: () => getGoShipCities(),
    onSuccess: (data: any) => {
      dispatch(setCitiesUpdate(transformAddressData(data?.data)));
    },
  });

  return {
    getCities: mutation.mutate,
    citiesData: mutation.data,
    citiesMutation: mutation,
  };
};
