import {ENUM} from "@/configs";
import {deleteUserAddressData} from "@/services/addresses";
import {RootState} from "@/stores";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useQueryGetAllAddreses} from "./use-get-all-addresses";
import {setUserAddressData} from "@/stores/datas/addresses-data-slice";
import {ToastSuccess} from "@/components/base-components/toast";
import {translate} from "@/utilities/translator";

export const useMutationDeleteAddreses = () => {
  const {addressDeletedSelected} = useSelector(
    (state: RootState) => state.address
  );
  const dispatch = useDispatch();
  const {data, query} = useQueryGetAllAddreses();
  const mutation = useMutation({
    mutationFn: () =>
      (addressDeletedSelected &&
        deleteUserAddressData(addressDeletedSelected)) ||
      Promise.resolve(),
    onSuccess: async () => {
      (await query.refetch()) && dispatch(setUserAddressData(data));
      ToastSuccess({msg: translate("remove_new_address_successfully")});
    },
  });

  return {deleteFnc: mutation.mutate, ...mutation};
};
