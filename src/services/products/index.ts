import { axios_instance, GetData } from "@/apis";
import { ProductType } from "@/types/products/product.type";
import { IQueryParams } from "@/types/query-params/query-params.type";
import { IResponse } from "@/types/response/response.type";

export const getProductByHandle = async (slug: string) => {
  return axios_instance.get<IResponse<ProductType>>(
    `/store/products/handle/${slug}`
  );
};

export const getSearchProducts = async (params?: Record<string, string>) => {
  return await axios_instance.get<any>(`/store/products/search`, {
    params,
  });
};

export const getAllProducts = async (params?: IQueryParams) => {
  return (
    await axios_instance.get<any>(`/store/products`, {
      params,
    })
  ).data;
};

export const getProductDatas = async (
  query?: string,
  q?: string,
  order?: string
): Promise<any> => {
  const response: any = await GetData(
    // `${process.env.NEXT_PUBLIC_API_URL}/products/list`,
    `${process.env.NEXT_PUBLIC_API_URL}/store/products`,
    {},
    {
      //   "x-publishable-api-key": `${process.env.NEXT_PUBLIC_API_PUBLISH_KEY}`,
      //   "ngrok-skip-browser-warning": true,
      //   credentials: "include",
    }
  );
  if (response) {
    return response;
  }
};
