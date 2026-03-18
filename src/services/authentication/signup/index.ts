import {PostData} from "@/apis";
import {
  ToastDismiss,
  ToastError,
  ToastSuccess,
} from "@/components/base-components/toast";
import {ENUM} from "@/configs";
import {SaveACookie} from "@/utilities/cookies";
import {EncryptBasic} from "@/utilities/hash-aes";
import {redirect} from "next/navigation";

export const SubmitSignupFunction = async (
  email: string,
  password: string,
  fullName: string,
  phone: string
): Promise<void> => {
  // Helper function for input validation
  const isFieldEmpty = (field: string) => !field.trim();

  if ([email, password, fullName, phone].some(isFieldEmpty)) {
    ToastError({msg: "Vui lòng điền vào tất cả các trường để đăng ký"});
    return;
  }

  const formSignup = {
    email,
    password,
    fullName,
    phone,
  };

  try {
    // Step 1: Register the user
    const response = await PostData<{
      token: string;
      message?: string;
    }>(
      `${process.env.NEXT_PUBLIC_API_URL}/store/auth/${ENUM.AUTH_PROVIDER_EMAILPASS}/register`,
      formSignup
    );

    if (!response?.token) {
      ToastError({msg: response.message || "Tài khoản có thể đã tồn tại"});
      return;
    }

    // Save token in cookies
    SaveACookie({
      key: "token",
      token: EncryptBasic(response.token, ENUM.SECRET_AES_TOKEN_HASH),
      expired: 1, // 1 day expiration
    });

    // Step 2: Create a customer profile
    const customerResponse: any = await PostData(
      `${process.env.NEXT_PUBLIC_API_URL}/store/customers`,
      {
        email,
        first_name: fullName,
        last_name: "",
        phone,
        metadata: {
          dob: "01/01/1900",
          username: "",
          gender: "male",
          avatar: null,
          is_verified: false,
        },
      },
      {
        Authorization: `Bearer ${response.token}`,
        "x-publishable-api-key": `${process.env.NEXT_PUBLIC_TOKEN}`,
      }
    );

    if (customerResponse) {
      ToastDismiss();
      ToastSuccess({
        msg: customerResponse.message || "Tạo tài khoản thành công",
      });
      redirect("/auth");
    } else {
      ToastError({msg: "Không thể tạo hồ sơ khách hàng"});
    }
  } catch (error: any) {
    // Handle error case and show a relevant toast
    console.error("Signup error:", error);
    // ToastError({msg: "Có lỗi xảy ra trong quá trình đăng ký"});
  }
};
