import { axios_instance, PostData } from "@/apis";
import {
  ToastDismiss,
  ToastError,
  ToastSuccess,
} from "@/components/base-components/toast";
import { ENUM } from "@/configs";
import { useCarts } from "@/hooks/queries/cart";
import { getUserData } from "@/services/users";
import { SignInBodyType } from "@/types/auth/sign-in.type";
import { SaveACookie } from "@/utilities/cookies";
import { EncryptBasic } from "@/utilities/hash-aes";

export const SubmitSigninFunction = async (email: string, password: string) => {
  const { createCart } = useCarts();
  const formSignup = {
    email: email,
    password: password,
  };
  ToastDismiss();

  try {
    const response = (await PostData(
      `${process.env.NEXT_PUBLIC_API_URL}/store/auth/${ENUM.AUTH_PROVIDER_EMAILPASS}`,
      formSignup
    )) as any;

    if (response) {
      SaveACookie({
        key: "token",
        token: EncryptBasic(response?.token, ENUM.SECRET_AES_TOKEN_HASH),
        expired: 1,
      });

      // Create cart for customer
      const cart: any = await createCart.createCartMutationAsync(email);

      if (cart) {
        localStorage.setItem("cart_id", cart.cart.id);
      }
      const res = await getUserData();
      if (response?.message) {
        ToastError({ msg: response?.message });
      } else {
        ToastSuccess({ msg: "Đăng nhập thành công" });
      }
      if (res) {
        return res;
      }
    }
    return null;
  } catch (error) {
    ToastError({ msg: "Email/Mật khẩu không đúng" });
    return null;
  }
};

export const signInApi = async (body: SignInBodyType) => {
  return axios_instance.post(
    `/store/auth/${ENUM.AUTH_PROVIDER_EMAILPASS}`,
    body
  );
};
