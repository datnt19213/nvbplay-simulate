import { axios_instance } from "@/apis";
import { ISaleChannelResponse } from "@/types/sale-channels";

export const getSaleChannels = async () => {
  return (
    await axios_instance.get<ISaleChannelResponse>(`/store/sales-channels`)
  ).data;
};
