import React from "react";
import { ENUM } from "@/configs";
import {
  createUserAddressData,
  deleteUserAddressData,
  updateUserAddressData,
} from "@/services/addresses";
import { RootState } from "@/stores";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useQueryGetAllAddreses } from "./use-get-all-addresses";
import { setUserAddressData } from "@/stores/datas/addresses-data-slice";
import { ToastDismiss, ToastSuccess } from "@/components/base-components/toast";
import { translate } from "@/utilities/translator";

export const useMutationCreateAddreses = () => {
  const { addressCreateFormData } = useSelector(
    (state: RootState) => state.address
  );
  const dispatch = useDispatch();
  const { data, query } = useQueryGetAllAddreses();
  const mutation = useMutation({
    mutationFn: () =>
      addressCreateFormData && createUserAddressData(addressCreateFormData),
    onSuccess: () => {
      query.refetch();
      ToastDismiss();
      ToastSuccess({ msg: translate("add_new_address_successfully") });
    },
    onError: (data) => {
      return data;
    },
  });

  return { createFnc: addressCreateFormData && mutation.mutate, ...mutation };
};
