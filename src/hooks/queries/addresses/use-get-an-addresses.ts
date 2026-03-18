import React from "react";
import {useQuery, keepPreviousData, useMutation} from "@tanstack/react-query";
import {ENUM} from "@/configs";
import {getAnUserAddressData} from "@/services/addresses";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";

export const useQueryUpdateGetAnAddreses = () => {
  const {addressUpdateSelected} = useSelector(
    (state: RootState) => state.address
  );
  const mutation = useMutation({
    mutationFn: () =>
      addressUpdateSelected?.id
        ? getAnUserAddressData(addressUpdateSelected.id)
        : Promise.resolve(null),
  });
  return {
    getDetailAddressFnc: addressUpdateSelected?.id && mutation.mutate,
    detailAddress: mutation.data,
    detailAddressMutation: mutation,
  };
};
