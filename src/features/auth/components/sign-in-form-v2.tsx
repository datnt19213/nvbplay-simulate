"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {IconInput} from "@/components/base-components/input/icon-input";
import {ToastError} from "@/components/base-components/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {ENUM} from "@/configs";
import useAuthMutation from "@/hooks/mutations/auths/useAuthMutation";
import useCartMutation from "@/hooks/mutations/carts/useCartMutation";
import {setUserData} from "@/stores/datas/users-data-slice";
import {GetACookie, SaveACookie} from "@/utilities/cookies";
import {DecryptBasic, EncryptBasic} from "@/utilities/hash-aes";
import {Lock, Mail} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {Suspense, useEffect} from "react";
import {RootState} from "@/stores";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ")
    .max(50, "Email không được vượt quá 50 ký tự"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(50, "Mật khẩu không được vượt quá 50 ký tự")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải chứa ít nhất:\n" +
        "- Một chữ cái viết thường (a-z)\n" +
        "- Một chữ cái viết hoa (A-Z)\n" +
        "- Một số (0-9)\n" +
        "- Một ký tự đặc biệt (@$!%*?&)"
    ),
});

const SignInFormV2 = () => {
  const router = useRouter();
  const {signInMutation, getUserMutation} = useAuthMutation();
  const {createCartMutation} = useCartMutation();
  const isLoading =
    signInMutation.isPending ||
    createCartMutation.isPending ||
    getUserMutation.isPending;
  const searchParams = useSearchParams();

  const {isRememberPass} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const emailStr = form.watch("email");
  const passwordStr = form.watch("password");

  const passRemembered = GetACookie("rp");

  useEffect(() => {
    if (passRemembered) {
      const decrypted = DecryptBasic(
        passRemembered,
        ENUM.SECRET_AES_TOKEN_HASH
      );
      if (decrypted) {
        form.setValue("email", JSON.parse(decrypted)?.email || "");
        form.setValue("password", JSON.parse(decrypted)?.password || "");
      }
    }
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    signInMutation.mutate(values, {
      onSuccess: (data: any) => {
        const {token} = data?.data;
        SaveACookie({
          key: "token",
          token: EncryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH),
          expired: 1,
        });
        isRememberPass &&
          SaveACookie({
            key: "rp",
            token: EncryptBasic(
              JSON.stringify({email: emailStr, password: passwordStr}),
              ENUM.SECRET_AES_TOKEN_HASH
            ),
          });
        createCartMutation.mutate(values.email, {
          onSuccess: (cartRes: any) => {
            localStorage.setItem("cart_id", cartRes.data.cart.id);
            getUserMutation.mutate(null, {
              onSuccess: (userRes: any) => {
                const redirectLink = searchParams.get("redirect");
                dispatch(setUserData(userRes.data));
                if (redirectLink) {
                  const hasQueryParams = redirectLink.includes("?");
                  const separator = hasQueryParams ? "&" : "?";
                  router.push(`${redirectLink}${separator}fromLogin=true`);
                } else {
                  router.replace("/");
                }
              },
              onError: () => {
                ToastError({msg: "Đã có lỗi xảy ra"});
              },
            });
          },
          onError: () => {
            ToastError({msg: "Đã có lỗi xảy ra"});
          },
        });
      },
      onError: (error: any) => {
        ToastError({msg: error?.data?.message as string});
      },
    });
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <IconInput
                    icon={<Mail size={20} />}
                    placeholder="Địa chỉ email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <IconInput
                    type="password"
                    showPasswordToggle
                    icon={<Lock size={20} />}
                    placeholder="Nhập mật khẩu"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <ButtonSubmitPrimary
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
          >
            Đăng nhập
          </ButtonSubmitPrimary>
        </form>
      </Form>
    </Suspense>
  );
};

export default SignInFormV2;
