import {toastNVB} from "@/components/base-components/toast";
import {profileResetPassword} from "@/services/authentication/reset-password";
import {setCurrentForm} from "@/stores/auth";
import {setResetPasswordModal} from "@/stores/profile";
import {translate} from "@/utilities/translator";
import {useMutation} from "@tanstack/react-query";
import {useDispatch} from "react-redux";

type IForm = {
  email: string;
  new_password: string;
  old_password: string;
};
export const useProfileResetPasswordMutation = () => {
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (formData: IForm) => {
      return profileResetPassword(formData);
    },

    onSuccess: (data) => {
      toastNVB({type: "success", msg: translate("password_change_success")});
      dispatch(setResetPasswordModal(false));
    },
    onError: (error) => {
      toastNVB({type: "error", msg: translate("password_change_failed")});
    },
  });

  return {
    resetPassword: (
      email: string,
      new_password: string,
      old_password: string
    ) => mutation.mutate({email, new_password, old_password}),
    ...mutation,
  };
};
