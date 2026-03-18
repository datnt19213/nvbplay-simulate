"use client";
import {toastNVB} from "@/components/base-components/toast";
import {ENUM} from "@/configs";
import {
  requestResetPassword,
  resetPassword,
} from "@/services/authentication/reset-password";
import {signInApi} from "@/services/authentication/signin";
import {getUserApi} from "@/services/users";
import {RootState} from "@/stores";
import {setCurrentForm} from "@/stores/auth";
import {SignInBodyType} from "@/types/auth/sign-in.type";
import {Decrypt} from "@/utilities/hash-aes";
import {translate} from "@/utilities/translator";
import {useMutation} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";

const useAuthMutation = () => {
  const signInMutation = useMutation({
    mutationFn: (body: SignInBodyType) => signInApi(body),
  });
  const getUserMutation = useMutation({
    mutationFn: (_: null) => getUserApi(),
  });
  return {signInMutation, getUserMutation};
};

export default useAuthMutation;

interface IResetPass {
  email: string;
  password: string;
  token: string;
}
export const useAuthResetPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: (formData: IResetPass) => {
      return resetPassword({
        // email: Decrypt(formData.email, ENUM.SECRET_AES_TOKEN_RESET_PASS_HASH),
        email: formData.email,
        // new_password: formData.password,
        new_password: formData.password,
        // resetToken: Decrypt(
        //   formData.token,
        //   ENUM.SECRET_AES_TOKEN_RESET_PASS_HASH
        // ),
        resetToken: formData.token,
      });
    },
    onSuccess: (data) => {
      toastNVB({type: "success", msg: translate("password_change_success")});
    },
    onError: (data) => {
      toastNVB({type: "error", msg: translate("password_change_failed")});
    },
  });

  return {
    resetPassword: ({email, password, token}: IResetPass) =>
      email && password && token && mutation.mutate({email, password, token}),
    ...mutation,
  };
};
export const useAuthRequestResetPasswordMutation = () => {
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (email: string) => {
      return requestResetPassword({email});
    },

    onSuccess: (data) => {
      toastNVB({type: "success", msg: translate("request_sent")});
      dispatch(setCurrentForm("success_forgot_password"));
    },
    onError: (error) => {
      toastNVB({type: "error", msg: translate("request_failed")});
    },
  });

  return {
    requestResetPassword: (email: string) => mutation.mutate(email),
    ...mutation,
  };
};
