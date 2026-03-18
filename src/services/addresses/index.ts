import { DeleteData, GetData, PatchData, PostData } from "@/apis";
import { ENUM } from "@/configs";
import { GetACookie } from "@/utilities/cookies";
import { DecryptBasic } from "@/utilities/hash-aes";
import { isTokenValid } from "@/utilities/token";
import { redirect, RedirectType } from "next/navigation";

const moreFields =
  "first_name,last_name,phone,company,address_1,address_2,city,country_code,province,postal_code,address_name,is_default_shipping,is_default_billing,metadata";

export const getAnUserAddressData = async (id: any): Promise<any> => {
  const token = GetACookie("token");
  if (token) {
    if (isTokenValid(DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH))) {
      const response = (await GetData(
        `${process.env.NEXT_PUBLIC_API_URL}/store/customers/me/addresses/${id}?fields=${moreFields}`,
        {},
        {
          Authorization: `Bearer ${DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)}`,
          // "x-publishable-api-key": `${process.env.NEXT_PUBLIC_API_PUBLISH_KEY}`,
          "ngrok-skip-browser-warning": "true",
        }
      )) as any;
      if (response?.addresses) {
        return response?.addresses;
      }
    }
    return null;
  }
  // redirect("/", RedirectType.push);
};
export const getUserAddressData = async (): Promise<any> => {
  const token = GetACookie("token");
  if (token) {
    if (isTokenValid(DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH))) {
      const response = (await GetData(
        `${process.env.NEXT_PUBLIC_API_URL}/store/customers/me/addresses?fields=${moreFields}`,
        {},
        {
          Authorization: `Bearer ${DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)}`,
          "ngrok-skip-browser-warning": "true",
        }
      )) as any;
      if (response?.addresses) {
        return response?.addresses;
      }
    }
  }
  return null;
};

export const createUserAddressData = async (data: any): Promise<any> => {
  const token = GetACookie("token");
  if (token) {
    if (isTokenValid(DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH))) {
      const response = await PostData(
        `${process.env.NEXT_PUBLIC_API_URL}/store/customers/me/addresses`,
        data,
        {
          Authorization: `Bearer ${DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)}`,
          // "x-publishable-api-key": `${process.env.NEXT_PUBLIC_API_PUBLISH_KEY}`,
          "ngrok-skip-browser-warning": "true",
        }
      );
      if (response) {
        return response;
      }
    }
  }
  redirect("/", RedirectType.push);
};

export const updateUserAddressData = async (
  id: string,
  data: any
): Promise<any> => {
  const token = GetACookie("token");
  if (token) {
    if (isTokenValid(DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH))) {
      const response = await PatchData(
        `${process.env.NEXT_PUBLIC_API_URL}/store/customers/me/addresses/${id}`,
        data,
        {
          Authorization: `Bearer ${DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)}`,
          "ngrok-skip-browser-warning": "true",
        }
      );
      if (response) {
        return response;
      }
    }
  }
  return null;
};

export const deleteUserAddressData = async (id: string): Promise<any> => {
  const token = GetACookie("token");
  if (token) {
    const response = await DeleteData(
      `${process.env.NEXT_PUBLIC_API_URL}/store/customers/me/addresses/${id}`,
      {},
      {
        Authorization: `Bearer ${DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)}`,
        "ngrok-skip-browser-warning": "true",
      }
    );
    if (response) {
      return response;
    }
  }
  return null;
};

//________________GO SHIP____________________

export const getGoShipCities = async (): Promise<any> => {
  const response = await GetData(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/goship/city`,
    {}
  );
  if (response) {
    return response;
  }
  return null;
};

export const getGoShipDistricts = async (province: string): Promise<any> => {
  const response = await GetData(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/goship/district/${province}`
  );
  if (response) {
    return response;
  }
  return null;
};

export const getGoShipWards = async (
  district: string,
  city: string
): Promise<any> => {
  const response = await GetData(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/goship/ward/${district}/${city}`
  );
  if (response) {
    return response;
  }
  return null;
};

export const getGoShipRate = async (data: any): Promise<any> => {
  const response = await PostData(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/goship/get-rate`,
    data
  );
  if (response) {
    return response;
  }
  return null;
};
