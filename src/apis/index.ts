import { ENUM } from "@/configs";
import { GetACookie } from "@/utilities/cookies";
import { DecryptBasic } from "@/utilities/hash-aes";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance with a base URL
export const axios_instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Environment variable for API URL
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

export const auth_axios_instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Environment variable for API URL
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
  validateStatus: () => true,
});

auth_axios_instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = GetACookie("token");
    const accessToken = DecryptBasic(
      token as string,
      ENUM.SECRET_AES_TOKEN_HASH
    );
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axios_instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize the error response
    if (error.response) {
      // Server responded with a status other than 2xx
      const { status, data } = error.response;
      return Promise.reject({
        status,
        message: data?.error || "An error occurred",
        data,
      });
    } else if (error.request) {
      // No response received from the server
      return Promise.reject({
        status: null,
        message: "No response received from server",
      });
    } else {
      // Error occurred during setting up the request
      return Promise.reject({
        status: null,
        message: error.message || "Request setup error",
      });
    }
  }
);

/**
 * The function `GetData` performs a GET request using Axios with error handling.
 * @param {string} url - The URL from which data will be fetched.
 * @param params - Optional query parameters for the request.
 * @param headers - Optional headers to include in the request.
 * @returns A Promise resolving to the generic type `T`.
 */
export const GetData = async <T>(
  url: string,
  params: Record<string, any> = {},
  headers: Record<string, any> = {},
  onStatus?: (status: number) => void
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios_instance.get(url, {
      params,
      headers,
    });
    if (onStatus) onStatus(response.status);
    return response.data;
  } catch (error: any) {
    return error.message || "An error occurred during GET request";
  }
};

/**
 * The function `PostData` sends a POST request to a specified URL with data and headers.
 * @param {string} url - The endpoint for the POST request.
 * @param data - Payload to send with the POST request.
 * @param headers - Optional headers to include in the request.
 * @returns A Promise resolving to the generic type `T`.
 */
export const PostData = async <T>(
  url: string,
  data: Record<string, any> = {},
  headers: Record<string, any> = {},

  onStatus?: (status: number) => void
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios_instance.post(url, data, {
      headers,
    });
    if (onStatus) onStatus(response.status);
    return response.data;
  } catch (error: any) {
    return error.message || "An error occurred during POST request";
  }
};

/**
 * The function `PutData` sends a PUT request to update data at a specified URL.
 * @param {string} url - The endpoint for the PUT request.
 * @param data - Payload to send with the PUT request.
 * @param headers - Optional headers to include in the request.
 * @returns A Promise resolving to the generic type `T`.
 */
export const PutData = async <T>(
  url: string,
  data: Record<string, any> = {},
  headers: Record<string, any> = {},
  onStatus?: (status: number) => void
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios_instance.put(url, data, {
      headers,
    });
    if (onStatus) onStatus(response.status);
    return response.data;
  } catch (error: any) {
    return error.message || "An error occurred during PUT request";
  }
};

/**
 * The function `PatchData` sends a PATCH request to partially update data at a specified URL.
 * @param {string} url - The endpoint for the PATCH request.
 * @param data - Payload to send with the PATCH request.
 * @param headers - Optional headers to include in the request.
 * @returns A Promise resolving to the generic type `T`.
 */
export const PatchData = async <T>(
  url: string,
  data: Record<string, any> = {},
  headers: Record<string, any> = {},
  onStatus?: (status: number) => void
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios_instance.patch(url, data, {
      headers,
    });
    if (onStatus) onStatus(response.status);
    return response.data;
  } catch (error: any) {
    return error.message || "An error occurred during PATCH request";
  }
};

/**
 * The function `DeleteData` sends a DELETE request to remove data from a specified URL.
 * @param {string} url - The endpoint for the DELETE request.
 * @param params - Optional query parameters for the request.
 * @param headers - Optional headers to include in the request.
 * @returns A Promise resolving to the generic type `T`.
 */
export const DeleteData = async <T>(
  url: string,
  params: Record<string, any> = {},
  headers: Record<string, any> = {},
  onStatus?: (status: number) => void
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios_instance.delete(url, {
      params,
      headers,
    });
    if (onStatus) onStatus(response.status);
    return response.data;
  } catch (error: any) {
    return error.message || "An error occurred during DELETE request";
  }
};
