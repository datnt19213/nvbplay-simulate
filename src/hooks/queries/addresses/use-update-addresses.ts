import {updateUserAddressData} from "@/services/addresses";
import {RootState} from "@/stores";
import {useMutation} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";
import {useQueryGetAllAddreses} from "./use-get-all-addresses";
import {setUserAddressData} from "@/stores/datas/addresses-data-slice";
import {ToastSuccess} from "@/components/base-components/toast";
import {translate} from "@/utilities/translator";

export const useMutationUpdateAddreses = () => {
  const {addressUpdateSelected, addressUpdateFormData} = useSelector(
    (state: RootState) => state.address
  );
  const dispatch = useDispatch();

  const {data, query} = useQueryGetAllAddreses();
  const mutation = useMutation({
    mutationFn: () =>
      updateUserAddressData(addressUpdateSelected.id, addressUpdateFormData),
    onSuccess: async () => {
      (await query.refetch()) && dispatch(setUserAddressData(data));
      ToastSuccess({msg: translate("update_new_address_successfully")});
    },
  });

  return {
    updateFnc: mutation.mutate,
    ...mutation,
  };
};
