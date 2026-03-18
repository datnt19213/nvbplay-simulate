import { axios_instance } from "@/apis";

export const getCollectionsList = async (params?: Record<string, string>) => {
  return axios_instance.get(`/store/collections`, { params });
};

export const getCollectionProducts = async (params?: Record<string, string>) => {
  return (await axios_instance.get(`/store/collections/products`, { params })).data;
};
