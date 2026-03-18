import { axios_instance } from "@/apis";

export const getPricelist = async (params?: Record<string, string>) => {
  return (await axios_instance.get(`/store/price-lists`, { params })).data;
};