import {toastNVB} from "@/components/base-components/toast";
import {useQueryGetUser} from "@/hooks/queries/user/use-get-user";
import {updateUserData} from "@/services/users";
import {RootState} from "@/stores";
import {setUserData} from "@/stores/datas/users-data-slice";
import {translate} from "@/utilities/translator";
import {useMutation} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";

export const useMutationUpdateProfile = () => {
  const dispatch = useDispatch();

  const {data, query} = useQueryGetUser();
  const mutation = useMutation({
    mutationFn: (form: any) => updateUserData(form),

    onSuccess: async () => {
      const refetchResult = await query.refetch();
      if (refetchResult.data) {
        dispatch(setUserData(refetchResult.data));
        toastNVB({
          type: "success",
          msg: translate("update_successful_profile"),
        });
      }
    },
    onError: (error) => {
      console.log(error);

      toastNVB({type: "error", msg: translate("update_failed_profile")});
    },
  });

  return {
    updateFnc: (form: any) => form && mutation.mutate(form),
    ...mutation,
  };
};
