import { auth_axios_instance, GetData, PatchData, PostData } from "@/apis";
import { ENUM } from "@/configs";
import { GetACookie } from "@/utilities/cookies";
import { DecryptBasic } from "@/utilities/hash-aes";
import { isTokenValid } from "@/utilities/token";
import { redirect, RedirectType } from "next/navigation";

export const getUserData = async (): Promise<any> => {
  const token = GetACookie("token");
  if (token) {
    if (isTokenValid(DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH))) {
      const response = (await GetData(
        `/store/customers/me`,
        {},
        {
          Authorization: `Bearer ${DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)}`,
          // "x-publishable-api-key": `${process.env.NEXT_PUBLIC_API_PUBLISH_KEY}`,
          "ngrok-skip-browser-warning": "true",
        }
      )) as any;
      if (response?.customer) {
        return response?.customer;
      }
    }
  }
  return null;
  // redirect("/", RedirectType.push);
};

export const getUserApi = async () => {
  return auth_axios_instance.get(`/store/customers/me`);
};

type userDataForm = {
  company_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  metadata: object;
};
export const updateUserData = async (data: userDataForm): Promise<any> => {
  const token = GetACookie("token");
  if (token) {
    if (isTokenValid(DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH))) {
      const response = await PatchData(`/store/customers/me`, data, {
        Authorization: `Bearer ${DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)}`,
        // "x-publishable-api-key": `${process.env.NEXT_PUBLIC_API_PUBLISH_KEY}`,
        "ngrok-skip-browser-warning": "true",
      });
      if (response) {
        return response;
      }
    }
    return;
  }
  redirect("/", RedirectType.push);
};
